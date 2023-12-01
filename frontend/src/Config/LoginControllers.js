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