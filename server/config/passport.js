import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/userModel.js";

if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
    throw new Error("Missing Google OAuth environment variables");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({googleId: profile.id});

                if(!user) {
                    user = await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        authProvider: "google",
                        avatar: profile.photos?.[0]?.value
                    })
                }
                
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

export default passport;