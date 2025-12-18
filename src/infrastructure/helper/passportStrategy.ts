import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ENV } from "./env/index";

const ENV_VARS = {
  Client_ID: ENV.Client_ID as string,
  Client_secret: ENV.Client_secret as string,
};

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV_VARS.Client_ID,
      clientSecret: ENV_VARS.Client_secret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log("Google profile:", profile);
        // Return the full profile object
        return cb(null, profile);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, cb) => {
  cb(null, user as any);
});

export default passport;