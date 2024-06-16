import { Model, PipelineStage, Document } from 'mongoose';

interface QueryParams {
    pageSize?: number;
    page?: number;
    sortBy?: string;
    direction?: number;
    searchBy?: string;
    search?: string;
    [key: string]: any;
}

interface PageData {
    totalPages: number;
    totalData: number;
    currentPage: number;
    pageSize: number;
}

class DataSource<T extends Document> {
    static MODE_FIND = 0;
    static MODE_AGGREGATE = 1;

    private Model: Model<T>;
    private query: QueryParams;
    private filtersAllowed: string[];
    private queryFilters: Record<string, any>;
    pageData: PageData | undefined;

    constructor(Model: Model<T>, query: QueryParams, filtersAllowed: string[] = []) {
        this.Model = Model;
        this.query = query;
        this.filtersAllowed = filtersAllowed;
        this.queryFilters = {};

        this.setQueryParams();
    }

    // ============= Private Methods ============= //
    private setQueryParams() {
        const {
            pageSize = 20,
            page = 1,
            sortBy,
            direction = 1,
            searchBy = 'name',
            search,
        } = this.query;

        // Filter the query filters to allow only the properties that are allowed by `filtersAllowed` array
        this.filtersAllowed.forEach(filterName => {
            const value = this.query[filterName];
            if (typeof value !== 'undefined') {
                this.queryFilters[filterName] = this.query[filterName];
            }
        });

        this.query = { pageSize, page, sortBy, direction, searchBy, search };
    }

    private getMatchQueries(stages: PipelineStage[]): PipelineStage[] {
        // It is a private method that filters mongo query and returns an array of match stage queries from an array of aggregation stages.
        return stages.filter(stage => Object.keys(stage).includes('$match')) || [];
    }

    private async setPageData(response: any) {
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
    public async find(filters: Record<string, any>): Promise<T[]> {
        // This method performs a find operation on the MongoDB collection using the specified mongo filters and query parameters.

        const {
            pageSize = 20,
            page = 1,
            sortBy = 'createdAt',
            direction = 1,
            searchBy = 'name',
            search,
        } = this.query;

        // `allFilters` is a collection of query filters and mongo filters
        const allFilters = { ...this.queryFilters, ...filters };

        if (search) {
            allFilters[searchBy] = new RegExp(search, 'i');
        }

        const finalStage: PipelineStage[] = [
            {
                $match: allFilters,
            },

            {
                $sort: {
                    [sortBy]: +direction as 1 | -1,
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

        const [response] = await this.Model.aggregate(finalStage).exec();

        await this.setPageData(response);

        return response.results;
    }

    public async aggregate(stages: any[]): Promise<T[]> {
        const {
            pageSize = 20,
            page = 1,
            sortBy = 'createdAt',
            direction = 1,
            searchBy = 'name',
            search,
        } = this.query;

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

        const [response] = await this.Model.aggregate(finalStage).exec();

        await this.setPageData(response);

        return response.results;
    }
}

export default DataSource;
