const nodeMailer = require("nodemailer");
const generateOtp = require("../utils/generateOtp");
const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");
const Otp = require("../models/Otp");
const Bcrypt = require("../bcrypt/index");

module.exports.sendOtp = async (req, res) => {
    await Otp.deleteMany({ user: req.user });
    const otp = generateOtp.getOtp(6);

    const createdOtp = new Otp();
    createdOtp.user = req.user;
    createdOtp.otp = otp;

    await createdOtp.save();

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });

    transporter.sendMail({
        from: 'Codeverse <codeverse@gmail.com>',
        to: req.user.email,
        subject: 'Verification Email',
        html: generateOtp.getBoilerHtml(req.user.name, otp, req.user.id)
    }, function (error, info) {
        if (error) {
            return res.status(400).json({ success: false, err: error })
        }
        else {

            return res.status(200).json({ success: true, email: info.accepted[0], messageId: info.messageId });
        }
    });
}

module.exports.verifyEmail = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    await Otp.deleteMany({ user: user });
    if (!user) {
        throw new ExpressError("User not Identified kindly try to verify using otp", 404);
    }
    if (user.isEmailVerified) {
        throw new ExpressError("User already verified", 404);
    }
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).send("User verified successfully.");
}

module.exports.verifyOtp = async (req, res) => {
    const { userOtp } = req.body;
    if (!userOtp) {
        throw new ExpressError("Enter the otp to verify", 400);
    }
    const otp = await Otp.find({ user: req.user });
    if (!otp) {
        await Otp.deleteMany({ user: req.user });
        throw new ExpressError("Otp might have been expired", 400);
    }
    if (otp.length === 0) {
        await Otp.deleteMany({ user: req.user });
        throw new ExpressError("Otp might have expired", 400);
    }
    if (otp.length > 1) {
        await Otp.deleteMany({ user: req.user });
        throw new ExpressError("Tried too many times,try again later", 400);
    }
    if (otp[0].otp !== userOtp) {
        await Otp.deleteMany({ user: req.user });
        throw new ExpressError("Otp not matching, Please try again", 400);
    }
    await User.findByIdAndUpdate(req.user._id, {
        isEmailVerified: true
    });
    const user = await User.findById(req.user._id, "-password");
    await Otp.deleteMany({ user: req.user });
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });
    transporter.sendMail({
        from: 'Codeverse <codeverse@gmail.com>',
        to: req.user.email,
        subject: 'Email verifcation sucessfull',
        html: generateOtp.confirmationMail(req.user.name)
    })
    return res.status(200).json({ success: true, message: "User verified successfully", user: user });
}

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ExpressError("Please provide your email to continue", 400);
    }
    const otp = generateOtp.getOtp(6);

    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ExpressError("No user identified with the given email", 400);
    }
    await Otp.deleteMany({ user: user });
    const createdOtp = new Otp();
    createdOtp.user = user;
    createdOtp.otp = otp;
    createdOtp.isForgotPassword = true;

    await createdOtp.save();

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });

    transporter.sendMail({
        from: 'Codeverse <codeverse@gmail.com>',
        to: user.email,
        subject: 'Verification Email',
        html: generateOtp.getForgotPasswordHtml(user.name, otp)
    }, function (error, info) {
        if (error) {
            return res.status(400).json({ success: false, err: error })
        }
        else {
            return res.status(200).json({ success: true, email: info.accepted[0], token: user.lastToken });
        }
    });
}

module.exports.changePassword = async (req, res) => {
    const { userOtp, password, email } = req.body;
    if (!userOtp) {
        throw new ExpressError("Enter the otp to verify", 400);
    }
    const u = await User.findOne({ email: email });
    const otp = await Otp.find({ user: u, isForgotPassword: true });
    if (!otp) {
        await Otp.deleteMany({ user: u });
        throw new ExpressError("Otp might have been expired", 400);
    }
    if (otp.length === 0) {
        await Otp.deleteMany({ user: u });
        throw new ExpressError("Otp might have expired", 400);
    }
    if (otp.length > 1) {
        await Otp.deleteMany({ user: u });
        throw new ExpressError("Tried too many times,try again later", 400);
    }
    if (otp[0].otp !== userOtp) {
        await Otp.deleteMany({ user: u });
        throw new ExpressError("Otp not matching, Please try again", 400);
    }
    const p = await Bcrypt.hashPassword(password);
    const user = await User.findByIdAndUpdate(u._id, {
        password: p,
        isEmailVerified: true,
    })
    await Otp.deleteMany({ user: u });
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });

    transporter.sendMail({
        from: 'Codeverse <codeverse@gmail.com>',
        to: u.email,
        subject: 'Password Changed Successfully',
        html: generateOtp.passwordChangeConfirmationMail(u.name)
    })
    return res.status(200).json({ success: true, message: "Password Changed Successfully" });

}