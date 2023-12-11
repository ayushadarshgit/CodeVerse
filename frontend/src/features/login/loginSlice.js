import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    user: undefined
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            console.log(actions.payload.user);
            state.isLoggedIn = true
            state.user = actions.payload.user
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = undefined
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;