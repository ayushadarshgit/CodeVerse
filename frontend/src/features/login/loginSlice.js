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
    messagesLoading: false,
    folderLoading: true,
    folder: null,
    openedFiles: [],
    openedFilesSavedCode: [],
    openedFilesCurrentCode: [],
    openedView: null,
    openedCode: "",
    notifications: [],
    isTyping: {
        status: false,
        userId: "",
    },
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
            state.chats = []
            state.selectedChat = null
            state.selectedChatMessages = []
            state.messagesLoading = false
            state.folderLoading = false
            state.folder = null
            state.openedFiles = []
            state.openedFilesSavedCode = []
            state.openedFilesCurrentCode = []
            state.openedView = null
            state.openedCode = ""
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
            const sm = state.selectedChatMessages.filter(sm => sm._id === actions.payload.message._id)
            if (sm.length === 0) {
                const m = state.selectedChatMessages
                m.push(actions.payload.message)
                state.selectedChatMessages = m
            }
        },
        setFolderLoading: (state, actions) => {
            state.folderLoading = actions.payload.loading
        },
        setFolder: (state, actions) => {
            state.folder = actions.payload.folder
        },
        setOpenedFiles: (state, actions) => {
            state.openedFiles = actions.payload.files
            state.openedFilesSavedCode = actions.payload.savedCode
            state.openedFilesCurrentCode = actions.payload.currentCode
        },
        setOpenedView: (state, actions) => {
            state.openedView = actions.payload.view
        },
        setOpenedCode: (state, actions) => {
            state.openedCode = actions.payload.code
        },
        setIsTyping: (state, actions) => {
            state.isTyping = actions.payload.isTyping
        },
        setNotifications: (state, actions) => {
            state.notifications = actions.payload.notifications
        },
    }
})

export const {
    login,
    logout,
    setChats,
    hideSnack,
    showSnack,
    setFolder,
    selectChat,
    addMessage,
    setIsTyping,
    setOpenedView,
    setOpenedCode,
    setOpenedFiles,
    setFolderLoading,
    setNotifications,
    setMessagesLoaded,
    setMessagesLoading,
    setSelectedChatMessages,
} = authSlice.actions;

export default authSlice.reducer;