import User from '../../schema/User.js';

export default async function (req, res, next) {
    const userIds = req.body.userIds;
    const emails = req.body.emails;

    try {
        if (emails) {
            const users = await User.find(
                { email: { $in: emails } },
                { _id: 1, firstName: 1, lastName: 1, photo: 1 }
            );

            return res.success({ users });
        }

        if (userIds) {
            const users = await User.find(
                { _id: { $in: userIds } },
                {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    photo: 1,
                }
            );

            return res.success({ users });
        }

        Error.throw('Please provide array of user Ids or emails to fetch');
    } catch (e) {
        next(e);
    }
}
