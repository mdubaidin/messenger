// Terminologies
// query filter: filters provided from the query
class DataSource {
    static MODE_FIND = 0;
    static MODE_AGGREGATE = 1;

    constructor(Model, query, filtersAllowed = []) {
        // query params
        // pageSize = 20, page = 1, srtBy, direction = 1, searchBy = 'name', search
        this.Model = Model;
        this.query = query;
        this.filtersAllowed = filtersAllowed;
        this.queryFilters = {};

        this.setQueryParams();
    }

    // ============= Private Methods ============= //
    setQueryParams() {
        const {
            pageSize = 20,
            page = 1,
            sortBy,
            direction = 1,
            searchBy = 'name',
            search,
        } = this.query;

        // filter the query filters to allow only the properties that are allowed by `filtersAllowed` array

        this.filtersAllowed.forEach(filterName => {
            const value = this.query[filterName];
            if (typeof value !== 'undefined') {
                this.queryFilters[filterName] = this.query[filterName];
            }
        });

        this.query = { pageSize, page, sortBy, direction, searchBy, search };
    }

    getMatchQueries(stages) {
        // It is a private method that filters mongo query and returns an array of match stage queries from an array of aggregation stages.
        return stages.filter(stage => Object.keys(stage).includes('$match')) || [];
    }

    async setPageData(response) {
        // Mode is either aggregate or find
        // Response may contain the response from mongoose query in case find calls it or it will contain an array of $match queries in case of aggregate queries
        const { pageSize = 20, page = 1 } = this.query;
        let totalCount = 0;

        totalCount = response.metaData?.count || 0;

        this.pageData = {
            totalPages: Math.ceil(totalCount / pageSize) || 0,
            totalData: totalCount,
            currentPage: +page,
            pageSize: +pageSize,
        };
    }

    // ============= Public Methods ============= //
    async find(filters) {
        // This method performs a find operation on the MongoDB collection using the specified mongo filters and query parameters.

        const { pageSize, page, sortBy, direction, searchBy, search } = this.query;

        // `allFilters` is a collection of query filters and mongo filters
        const allFilters = { ...this.queryFilters, ...filters };

        if (search) {
            allFilters[searchBy] = new RegExp(search, 'i');
        }

        const finalStage = [
            {
                $match: allFilters,
            },
            {
                $sort: {
                    [sortBy]: +direction,
                },
            },
            {
                $facet: {
                    contacts: [
                        {
                            $skip: Number(pageSize * (page - 1)),
                        },
                        {
                            $limit: Number(pageSize),
                        },
                    ],
                    metaData: [
                        {
                            $group: {
                                _id: 'null',
                                count: {
                                    $count: {},
                                },
                            },
                        },
                    ],
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        results: '$contacts',
                        metaData: {
                            $first: '$metaData',
                        },
                    },
                },
            },
        ];

        const [response] = await this.Model.aggregate(finalStage);

        this.setPageData(response);

        return response.results;
    }

    async aggregate(stages) {
        const { pageSize, page, sortBy, direction, searchBy, search } = this.query;

        // Adding $match stage with search query added
        if (search) {
            stages.unshift({
                $match: {
                    [searchBy]: new RegExp(search, 'i'),
                },
            });
        }

        // Creating final stage with query filters added
        const finalStage = [
            { $match: this.queryFilters },
            ...stages,
            {
                $sort: {
                    [sortBy]: +direction,
                },
            },
            {
                $facet: {
                    contacts: [
                        {
                            $skip: Number(pageSize * (page - 1)),
                        },
                        {
                            $limit: Number(pageSize),
                        },
                    ],
                    metaData: [
                        {
                            $group: {
                                _id: 'null',
                                count: {
                                    $count: {},
                                },
                            },
                        },
                    ],
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        results: '$contacts',
                        metaData: {
                            $first: '$metaData',
                        },
                    },
                },
            },
        ];

        const [response] = await this.Model.aggregate(finalStage);

        this.setPageData(response);

        // Setting the page data
        // await this.setPageData(finalStage, DataSource.MODE_AGGREGATE);

        // // Creating mongooseQuery with all stages
        // const mongooseQuery = this.Model.aggregate(finalStage);

        // implementing sort if needed
        // if (sortBy) {
        //     mongooseQuery.sort({ [sortBy]: +direction });
        // }

        // Implementing skip and limit for pagination
        // mongooseQuery
        //     .skip(Number(pageSize * (page - 1)))
        //     .limit(Number(pageSize));

        return response.results;
    }
}

export default DataSource;
