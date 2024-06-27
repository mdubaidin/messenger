import { Issuer } from 'openid-client';
import { Handler } from 'express';
import User from '../../models/User.js';
import { generateJWT } from '../../utils/jwt/jwt.js';
import { setCookie } from '../../utils/cookies.js';
import { setTokenCookies } from '../../utils/jwt/token.js';

const facebookIssuer = await Issuer.discover(
    'https://limited.facebook.com/.well-known/openid-configuration/'
);

const client = new facebookIssuer.Client({
    client_id: process.env.FACEBOOK_APP_ID as string,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uris: [process.env.FACEBOOK_REDIRECT_URI] as string[],
    response_types: ['code'],
});

const params = {
    scope: 'public_profile,email',
};

const facebookClient: Handler = async function (req, res) {
    const authUrl = client.authorizationUrl(params);
    res.redirect(authUrl);
};

const facebookClientCallback: Handler = async function (req, res) {
    const params = client.callbackParams(req);
    try {
        const tokenSet = await client.callback(process.env.FACEBOOK_REDIRECT_URI, params);
        tokenSet.claims();

        const userinfo = await client.userinfo(tokenSet);

        console.log(userinfo);

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

        res.redirect(process.env.FRONTEND_URL as string);
        console.log('redirect to ', process.env.FRONTEND_URL);
    } catch (err: any) {
        console.log(err);
        const message =
            err.code === 11000
                ? 'This email aready being used by someone'
                : err.message || 'Something went wrong';
        res.redirect(process.env.FRONTEND_URL + '/auth/log-in?e=' + encodeURIComponent(message));
    }
};

export { facebookClient, facebookClientCallback };
