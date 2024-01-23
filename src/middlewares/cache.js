import { json } from 'express';
import redis from '../libs/redis.js';

export default function (fn) {
    return async function (req, res, next) {
        const source = fn(req);

        // ioredis supports the node.js callback style
        redis.get(source, (err, data) => {
            if (err) return next(err);
            if (data) return res.success({ data: json(data) });

            console.log('data is not available in cache');

            next();
        });
    };
}
