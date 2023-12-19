export const getAllMessages = async (chatId, loadComplete, setSelecetedChatMessagesFunction, setShowSnackFunction) => {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/message/allmessage",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                chatId: chatId
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setSelecetedChatMessagesFunction(json.messages);
    } else {
        setShowSnackFunction(json.err, "error");
    }
    loadComplete();
}

export const sendMessage = async (message, addMessageFunction, setShowSnackFunction, setSendingMessage, selectedChat) => {
    const token = localStorage.getItem("codeverseUserSignInToken");
    message.chat = selectedChat;
    const response = await fetch(
        "http://localhost:5000/codeverse/message/sendmessage",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                message: message
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        addMessageFunction(json.message);
    } else {
        setShowSnackFunction(json.err, "error");
    }
    setSendingMessage(false);
}

export const getBorderTopRadius = (messages, ind) => {
    if (ind === 0) return 8;
    if (messages[ind - 1].sender._id === messages[ind].sender._id) return 4;
    return 8;
}

export const getBorderBottomRadius = (messages, ind) => {
    if (ind === messages.length - 1) return 8;
    if (messages[ind + 1].sender._id !== messages[ind].sender._id) return 8;
    return 4;
}

export const getDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    const todayDate = new Date();
    if(todayDate.getMonth()+1 === month && todayDate.getFullYear() === year){
        const d = todayDate.getDate();
        if(d === day){
            return {
                date: `Today`,
                time: `${hour} : ${min}`
            }
        }
        if(d === day+1){
            return {
                date: `Yesterday`,
                time: `${hour} : ${min}`
            }
        }
    }
    return {
        date: `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`,
        time: `${hour} : ${min}`
    }
}

export const getShowDate = (messages, ind) => {
    const date = getDate(messages[ind].createdAt);
    if (ind === 0) return true;
    const datePrev = getDate(messages[ind - 1].createdAt);
    if (date.date !== datePrev.date) {
        return true
    }else{
        return false
    }
}