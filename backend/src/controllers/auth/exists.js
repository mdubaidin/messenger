import User from '../../schema/User.js';

function exists(toFind) {
    return async function (req, res, next) {
        try {
            const user = await User.findOne({
                [toFind]:
                    req.body.value +
                    (toFind === 'email' ? '@' + process.env.EMAIL_DOMAIN : ''),
            });

            console.log({ toFind, value: req.body.value, user });
            res.success({
                exists: Boolean(user),
            });
        } catch (e) {
            next(e);
        }
    };
}

export default exists;
