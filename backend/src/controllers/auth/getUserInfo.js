import User from '../../schema/User.js';

export default async function (req, res, next) {
    const email = req.query.email;
    const userId = req.query.id;

    try {
        if (email) {
            const user = await User.findOne(
                { email },
                { _id: 1, firstName: 1, lastName: 1, photo: 1 }
            );

            if (!user) Error.throw(`No user associated with this ${email} address`, 404);

            return res.success({ user });
        }

        if (userId) {
            const user = await User.findById(userId, {
                email: 1,
                firstName: 1,
                lastName: 1,
                photo: 1,
            });
            if (!user) Error.throw(`No user associated with this userId ${userId} `, 404);

            return res.success({ user });
        }

        Error.throw('Please provide the email or user ID in a query params to fetch', 400);
    } catch (e) {
        next(e);
    }
}
