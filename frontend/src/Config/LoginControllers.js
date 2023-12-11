export function loginGoogle() {
    window.location.href = 'http://localhost:5000/codeverse/google/signin';
}

export async function loginSuccess() {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/compile",
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
    return json;
}

export async function signin(loginFuction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    if (!token) {
        return false;
    }
    const response = await fetch(
        "http://localhost:5000/codeverse/user/signin",
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
    // console.log(json);
    if (json.success) {
        loginFuction(json.user);
        return true;
    } else {
        return false;
    }
}

export async function loginUser({ loginFuction, user }) {
    const response = await fetch(
        "http://localhost:5000/codeverse/user/login",
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