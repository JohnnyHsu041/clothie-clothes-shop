import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isLoggedIn: boolean;
    userId: string | null;
    email: string | null;
}

const initialState: Auth = {
    isLoggedIn: false,
    userId: null,
    email: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.email = action.payload.email;

            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: action.payload.userId,
                    email: action.payload.email,
                })
            );
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = null;
            state.userId = null;

            localStorage.removeItem("userData");
        },
    },
});

const AuthActions = authSlice.actions;

export default AuthActions;
