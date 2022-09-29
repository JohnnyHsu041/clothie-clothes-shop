import { createSlice } from "@reduxjs/toolkit";

interface CartProducts {
    products: {
        id: string;
        name: string;
        price: number;
        size: string;
        amount: number;
        total: number;
    }[];
    totalAmount: number;
}

const initialState: CartProducts = {
    products: [],
    totalAmount: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            if (
                state.products.find(
                    (product) => product.id === action.payload.id
                )
            ) {
                const existedProduct = state.products.find(
                    (product) => product.id === action.payload.id
                )!;

                if (existedProduct.amount + action.payload.amount > 3) {
                    existedProduct.amount = 3;
                } else {
                    existedProduct.amount += action.payload.amount;
                }

                existedProduct.total =
                    existedProduct.price * existedProduct.amount;

                state.totalAmount = state.products.reduce(
                    (accu, curr) => accu + curr.total,
                    0
                );

                return;
            }

            state.products.push({
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                size: action.payload.size,
                amount: action.payload.amount,
                total: action.payload.price * action.payload.amount,
            });

            state.totalAmount += action.payload.price * action.payload.amount;
        },
        remove(state, action) {
            const existedProduct = state.products.find(
                (product) => product.id === action.payload.id
            )!;

            state.totalAmount -= existedProduct.total;
            state.products.filter(
                (product) => product.id !== action.payload.id
            );
        },
    },
});

const CartActions = cartSlice.actions;

export default CartActions;
