export async function signUpUser({ loginFuction, user }){
    const response = await fetch(
        "http://localhost:5000/codeverse/user/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        loginFuction(json.user);
        localStorage.setItem("codeverseUserSignInToken",json.token);
        return { success: true, username: json.user.name };
    } else {
        return { success: false, message: json.err };
    }
}