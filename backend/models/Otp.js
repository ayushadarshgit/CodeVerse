const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    isForgotPassword: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    expires: '5m'
})

module.exports = mongoose.model("Otp",otpSchema);