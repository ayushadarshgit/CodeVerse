const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");
const Folder = require("../models/Folder");
const ExpressError = require("./ExpressError");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
    callbackURL: "/codeverse/google/login",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({ googleId: profile.id });
    if (currentUser) {
        done(null, currentUser);
    } else {
        const u = await User.findOne({ email: profile._json.email });
        if (u) {
            u.googleId = profile.id;
            u.isEmailVerified = true;
            await u.save();
            done(null, u);
        } else {
            try {
                const createdFolder = new Folder();
                createdFolder.foldername = "root";
                createdFolder.isdefaultfolder = true;
                await createdFolder.save();

                const createdUser = new User();
                createdUser.name = profile._json.name;
                createdUser.email = profile._json.email;
                createdUser.isEmailVerified = true;
                createdUser.googleId = profile.id;
                createdUser.isCloudinary = false;
                createdUser.defaultfolder = createdFolder;
                await createdUser.save();
                done(null, createdUser);
            } catch (error) {
                console.log(error);
                throw new ExpressError("Error Creating new User",400);
            }
        }
    }
}))