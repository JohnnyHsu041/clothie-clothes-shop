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
        // createAccount(state, action) {
        //     const existedUser = state.accounts.find(
        //         (account) => account.email === action.payload.email
        //     );

        //     if (existedUser) {
        //         alert("existed");
        //         return;
        //     }

        //     const newUser = {
        //         id: "p1",
        //         email: action.payload.email,
        //         password: action.payload.password,
        //     };

        //     state.accounts.push(newUser);
        //     state.isLoggedIn = true;
        // },
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
