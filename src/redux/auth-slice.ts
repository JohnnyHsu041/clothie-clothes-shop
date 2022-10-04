import { createSlice } from "@reduxjs/toolkit";

interface Account {
    id: string;
    email: string;
    password: string;
}

interface Auth {
    isLoggedIn: boolean;
    accounts: Account[];
}

const initialState: Auth = {
    isLoggedIn: false,
    accounts: [],
};

export const authSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        createAccount(state, action) {
            const existedUser = state.accounts.find(
                (account) => account.email === action.payload.email
            );

            if (existedUser) {
                alert("existed");
                return;
            }

            const newUser = {
                id: "p1",
                email: action.payload.email,
                password: action.payload.password,
            };

            state.accounts.push(newUser);
            state.isLoggedIn = true;
        },
        login(state, action) {
            const existedUser = state.accounts.find(
                (account) => account.email === action.payload.email
            );

            if (!existedUser) {
                alert("please register an account");
                return;
            }

            if (existedUser.password === action.payload.password) {
                state.isLoggedIn = true;
            }
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

const AuthActions = authSlice.actions;

export default AuthActions;
