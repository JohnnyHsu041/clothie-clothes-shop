import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isLoggedIn: boolean;
    userId: string | null;
    token: string | null;
    tokenExpirationDate: string | null;
}

const initialState: Auth = {
    isLoggedIn: false,
    userId: null,
    token: null,
    tokenExpirationDate: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = !!action.payload.token;
            state.userId = action.payload.userId;

            const tokenExpiration =
                action.payload.expiration ||
                new Date(new Date().getTime() + 1000 * 60 * 60 * 2); // 2h validity for (UTC/GMT +08:00)

            state.tokenExpirationDate = tokenExpiration.toISOString();

            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: action.payload.userId,
                    token: action.payload.token,
                    expiration: state.tokenExpirationDate,
                })
            );
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
            state.tokenExpirationDate = null;

            localStorage.removeItem("userData");
        },
    },
});

const AuthActions = authSlice.actions;

export default AuthActions;
