import { Handler } from 'express';
import User from '../../models/User.js';
import { generateOTP, generateTemplate } from '../../utils/functions.js';
import CustomError from '../../classes/CustomError.js';
import OTP from '../../models/OTP.js';
import transporter from '../../libs/nodemailer.js';
import fs from 'fs';

const identify: Handler = async function (req, res, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return CustomError.throw('No account associated with this email!', 404);

        const otp = generateOTP(6);

        await OTP.deleteMany({ email, type: 'password-reset' });

        await OTP.create({ email, otp, type: 'password-reset' });

        const html = fs.readFileSync('templates/email/resetPassword.html', {
            encoding: 'utf-8',
        });

        const template = generateTemplate(html, {
            link: `${process.env.FRONTEND_URL}/auth/reset?email=${email}&code=${otp}`,
            name: user.name,
        });

        transporter.sendMail({
            from: 'Messengerz <onboarding@resend.dev>',
            to: email, // list of receivers
            subject: 'Reset Your Password for Messengerz ',
            html: template, // html body
        });

        res.success(
            `Your password reset request has been received and An email sent to your ${email}`
        );
    } catch (e) {
        next(e);
    }
};

export default identify;
