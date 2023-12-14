import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    user: undefined,
    show: false,
    message: "Test Snack",
    severity: "warning",
    vertical: "bottom",
    horizontal: "left",
    chats: [],
    selectedChat: null,
    selectedChatMessages: [],
    messagesLoading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.isLoggedIn = true
            state.user = actions.payload.user
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = undefined
        },
        showSnack: (state, actions) => {
            state.show = true;
            state.message = actions.payload.message
            state.severity = actions.payload.severity
            state.vertical = actions.payload.vertical
            state.horizontal = actions.payload.horizontal
        },
        hideSnack: (state) => {
            state.show = false
            state.message = ""
        },
        setChats: (state, actions) => {
            state.chats = actions.payload.chats
        },
        selectChat: (state, actions) => {
            state.selectedChat = actions.payload.selectedChat
        },
        setSelectedChatMessages: (state, actions) => {
            state.selectedChatMessages = actions.payload.messages
        },
        setMessagesLoading: (state) => {
            state.messagesLoading = true
        },
        setMessagesLoaded: (state) => {
            state.messagesLoading = false
        },
        addMessage: (state, actions) => {
            const m = state.selectedChatMessages
            m.push(actions.payload.message)
            state.selectedChatMessages = m
        }
    }
})

export const {
    login,
    logout,
    setChats,
    hideSnack,
    showSnack,
    selectChat,
    addMessage,
    setMessagesLoaded,
    setMessagesLoading,
    setSelectedChatMessages,
} = authSlice.actions;

export default authSlice.reducer;