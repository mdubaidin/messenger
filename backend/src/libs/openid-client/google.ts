import { Issuer } from 'openid-client';
import { Handler } from 'express';
import User from '../../models/User.js';
import { signToken } from '../../utils/functions.js';

const googleIssuer = await Issuer.discover('https://accounts.google.com');

const client = new googleIssuer.Client({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_REDIRECT_URI] as string[],
    response_types: ['code'],
});

const params = {
    scope: 'openid email profile',
};

const googleClient: Handler = async function (req, res) {
    const authUrl = client.authorizationUrl(params);
    res.redirect(authUrl);
};

const googleClientCallback: Handler = async function (req, res, next) {
    const params = client.callbackParams(req);
    try {
        const tokenSet = await client.callback(process.env.GOOGLE_REDIRECT_URI, params);
        tokenSet.claims();

        const userinfo = await client.userinfo(tokenSet);
        req.user = userinfo;

        const user = await User.findOne({ providerId: userinfo.sub });

        if (user) {
            const token = signToken(user);

            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect(process.env.MAIN_SITE_URL + '/c');
        } else {
            const newUser = new User({
                name: userinfo.name,
                email: userinfo.email,
                picture: userinfo.picture,
                provider: 'Google',
                providerId: userinfo.sub,
                password: userinfo.sub,
            });

            await newUser.save();
            const token = signToken(newUser);

            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect(process.env.MAIN_SITE_URL + '/c');
        }
    } catch (err) {
        next(err);
    }
};

export { googleClient, googleClientCallback };
