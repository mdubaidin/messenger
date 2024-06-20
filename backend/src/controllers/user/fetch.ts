import { Handler } from 'express';
import DataSource from '../../classes/DataSource.js';
import User from '../../models/User.js';

const fetch: Handler = async function (req, res, next) {
    const userId = req.params.id;

    try {
        if (userId) {
            const user = await User.findById(userId).select('-password -refreshToken -otp');
            return res.success({ user, token: req.headers.accessToken });
        }

        const dataSource = new DataSource(User, req.query);
        const users = await dataSource.aggregate([
            {
                $project: {
                    password: 0,
                    refreshToken: 0,
                    otp: 0,
                },
            },
        ]);

        res.success({ users, pageData: dataSource.pageData });
    } catch (err) {
        next(err);
    }
};

export default fetch;
