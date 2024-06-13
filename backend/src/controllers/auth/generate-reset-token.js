import User from '../../schema/User.js';
import { generateOTP } from '../../utils/functions.js';

export default async function (req, res, next) {
    const email = req.params.email;
    console.log(email);

    try {
        const user = await User.findOne({ backupEmail: email, role: 'user' });

        if (!user) {
            Error.throw('No account associated with this email!', 404);
        }

        const otp = generateOTP(4);

        user.otp.email = otp;

        const command = new SendEmailCommand({
            Content: {
                Template: {
                    TemplateName: 'resetVerificationCode',
                    TemplateData: JSON.stringify({
                        name: user.firstName + ' ' + user.lastName,
                        code: user.otp.email,
                    }),
                },
            },
            Destination: {
                ToAddresses: [user.backupEmail],
            },
            FromEmailAddress: 'no-reply@gengreek.com',
        });

        await client.send(command);

        await user.save();

        res.success(
            `Your password reset request has been received and An email sent to your ${email}`
        );
    } catch (e) {
        next(e);
    }
}
