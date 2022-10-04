import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import { cartSlice } from "./cart-slice";

const store = configureStore({
    reducer: { cart: cartSlice.reducer, auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
