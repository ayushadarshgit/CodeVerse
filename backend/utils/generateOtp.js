const otpGenerator = require("otp-generator");

module.exports.getOtp = (len) => {
    const otp = otpGenerator.generate(len, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    return otp;
}

module.exports.getBoilerHtml = (name, otp, id) => {
    return `
        <h2>Hello ${name},</h2>
        <p>This mail is sent to on behalf of Codeverse. This is to verify your registered email Id</p>
        <p>To verify your email : <a href="http://localhost:5000/codeverse/verify/verificationlink/${id}">Click Here</a> </p>
        <p>You can Also verify you'r email by entering the Otp : <h3>${otp}</h3></p>
        <p>Note: - This Otp will expire in 5 mins after it was generated. So, enter before that...</p>
        <p>Regards,<br>Codeverse</p>
    `
}

module.exports.getForgotPasswordHtml = (name, otp) => {
    return `
        <h2>Hello ${name},</h2>
        <p>This mail is sent to on behalf of Codeverse. This is to verify it is you requesting to change password</p>
        <p>You can verify you'r identity by entering the Otp : <h3>${otp}</h3></p>
        <p>Note: - This Otp will expire in 5 mins after it was generated. So, enter before that...</p>
        <p>Regards,<br>Codeverse</p>
    `
}

module.exports.confirmationMail = (name) => {
    return `<h2>Hello ${name},</h2>
    <p>This mail is sent to on behalf of Codeverse. This is a confirmation mail regarding your Email Verification</p>
    <h5>We are greateful that you choose Codeverse.</h5>
    <p>Thanks for Choosing Codeverse</p>
    <p>Regards,<br>Codeverse</p>`
}

module.exports.passwordChangeConfirmationMail = (name) => {
    return `<h2>Hello ${name},</h2>
    <p>This mail is sent to on behalf of Codeverse. This is a confirmation mail regarding your password change request</p>
    <h5>The password of your Codeverse account is changed successfully.</h5>
    <p>Thanks for Choosing Codeverse</p>
    <p>Regards,<br>Codeverse</p>`
}