import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import fs from 'fs';
import passport from 'passport';

const PUBLIC_KEY = fs.readFileSync('./certs/public.pem', 'utf8');

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithms: ['RS256'],
};

const passportJWT = new JwtStrategy(options, async function (payload, done) {
    try {
        if (payload.id) {
            return done(null, payload);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
});

passport.use(passportJWT);
