const bcrypt = require("bcrypt");

module.exports.hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(pw, salt);
    return secPassword;
}

module.exports.matchPassword = async(password, hp)=>{
    const pwdCompare = await bcrypt.compare(password, hp);
    if(!pwdCompare) return false;
    return true;
}