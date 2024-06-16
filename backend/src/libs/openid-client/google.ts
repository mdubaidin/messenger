import { Issuer } from 'openid-client';
import { Handler } from 'express';
import User from '../../models/User.js';
import { generateJWT } from '../../utils/jwt.js';
import { setCookie } from '../../utils/cookies.js';

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

        let user = null;

        user = await User.findOne({ providerId: userinfo.sub });

        if (!user) {
            user = new User({
                name: userinfo.name,
                email: userinfo.email,
                picture: userinfo.picture,
                provider: 'Google',
                providerId: userinfo.sub,
                password: userinfo.sub,
            });
        }

        await user.save();

        console.log(user);

        const { accessToken, refreshToken } = await generateJWT(user);

        setCookie(res, 'access_token', accessToken);
        setCookie(res, 'refresh_token', refreshToken);

        res.redirect(process.env.MAIN_SITE_URL + '/c');
        res.success({
            user,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
};

export { googleClient, googleClientCallback };
