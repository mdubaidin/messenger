import { Handler } from 'express';
import DataSource from '../../classes/DataSource.js';
import Request from '../../models/Request.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;

        const dataSource = new DataSource(Request, req.query);

        const requests = await dataSource.find({ receiver: userId });

        res.success({ requests, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;
