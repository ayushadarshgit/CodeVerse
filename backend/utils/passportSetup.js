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
                createdFolder.foldername = "root"
                createdFolder.isdefaultfolder = true;
                await createdFolder.save();

                const newUser = new User();
                newUser.email = profile._json.email;
                newUser.googleId = profile.id;
                newUser.name = profile._json.name;
                newUser.password = "";
                newUser.isEmailVerified = true;
                newUser.isPhoneVerified = false;
                newUser.phoneNumber = "";
                newUser.isCloudinary = false;
                newUser.defaultfolder = createdFolder;
                await newUser.save();
                done(null, newUser);
            } catch (error) {
                throw new ExpressError("Error Creating The Object", 200);
            }
        }
    }
}))