export async function fetchChats(getChatsFunction){
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/chats/fetchchats",
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
    if(json.success){
        getChatsFunction(json.chats);
        return {success: true};
    }else{
        return {success: false,message: json.err};
    }
}

export async function createNewChat(id){
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/chats/getchat",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                userId: id
            }),
        }
    );
    const json = await response.json();
    if(json.success){
        return {success: true};
    }else{
        return {success: false,message: json.err};
    }
}

export function getOtherIndex(users,user){
    if(users[0]._id===user._id) return 1;
    else return 0;
}