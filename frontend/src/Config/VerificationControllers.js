export const sendVerificationOtp = async (setShowSnackFunction) => {
    const token = localStorage.getItem("codeverseUserSignInToken");
    if (!token) {
        return false;
    }
    const response = await fetch(
        `http://localhost:5000/codeverse/verify/sendmail`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction("Email Sent Sucessfully", "success");
    } else {
        setShowSnackFunction(json.err + ", Kindly refresh the page to retry", "error")
    }
}

export const otpVerificationFunction = async (otp, setShowSnackFunction) => {
    const token = localStorage.getItem("codeverseUserSignInToken");
    if (!token) {
        return false;
    }
    const response = await fetch(
        `http://localhost:5000/codeverse/verify/otpverification`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                userOtp: otp
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction("Email Verified SuccessFully", "success");
        return { success: true, user: json.user };
    } else {
        setShowSnackFunction(json.err, "error");
        return { success: false };
    }
}

export const sendForgotPasswordOtp = async (email, setShowSnackFunction) => {
    const response = await fetch(
        `http://localhost:5000/codeverse/verify/forgotpassword`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction("Email sent SuccessFully", "success");
        return { success: true };
    } else {
        setShowSnackFunction(json.err, "error");
        return { success: false };
    }
}

export const changeForgottenPassword = async (email, otp, password, setShowSnackFunction) => {
    const response = await fetch(
        `http://localhost:5000/codeverse/verify/changepassword`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                userOtp: otp,
                password: password
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction(json.message, "success");
        return { success: true };
    } else {
        setShowSnackFunction(json.err, "error");
        return { success: false };
    }
}