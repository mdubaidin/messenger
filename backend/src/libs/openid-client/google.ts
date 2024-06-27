import { Issuer } from 'openid-client';
import { Handler } from 'express';
import User from '../../models/User.js';
import { generateJWT } from '../../utils/jwt/jwt.js';
import { setCookie } from '../../utils/cookies.js';
import { setTokenCookies } from '../../utils/jwt/token.js';

const googleIssuer = await Issuer.discover('https://accounts.google.com');

const client = new googleIssuer.Client({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_REDIRECT_URI] as string[],
    response_types: ['code'],
});

const params = {
    scope: 'openid email profile',
    prompt: 'consent',
};

const googleClient: Handler = async function (req, res) {
    const authUrl = client.authorizationUrl(params);
    res.redirect(authUrl);
};

const googleClientCallback: Handler = async function (req, res) {
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

            await user.save();
        }

        const { accessToken, refreshToken } = await generateJWT(user);

        setTokenCookies(res, accessToken, refreshToken);
        // setCookie(res, 'google_oauth_access', tokenSet.access_token as string);

        res.redirect(process.env.FRONTEND_URL + `/auth/log-in?s=200`);
        console.log('redirect to ', process.env.FRONTEND_URL);
    } catch (err: any) {
        const message =
            err.code === 11000
                ? 'This email aready being used by someone'
                : err.message || 'Something went wrong';
        res.redirect(
            process.env.FRONTEND_URL + `/auth/log-in?s=${err.code}&e=${encodeURIComponent(message)}`
        );
    }
};

export { googleClient, googleClientCallback };
