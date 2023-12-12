export async function getAllUsers(search, setProfiles, setLoading) {
    setLoading(true);
    const token = localStorage.getItem("codeverseUserSignInToken");
    if (!token) {
        return false;
    }
    const response = await fetch(
        `http://localhost:5000/codeverse/user?search=${search}`,
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
        setProfiles(json.users);
        setLoading(false);
        return { success: true };
    } else {
        setLoading(false);
        return { success: false, message: json.err }
    }
}