import { createSlice } from "@reduxjs/toolkit";

export interface Product {
    id: string;
    name: string;
    price: number;
    size: string;
    amount: number;
    total: number;
}

interface CartProducts {
    products: Product[];
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
                    (product) =>
                        product.id === action.payload.id &&
                        product.size === action.payload.size
                )
            ) {
                const existedProductWithSameSize = state.products.find(
                    (product) =>
                        product.id === action.payload.id &&
                        product.size === action.payload.size
                )!;

                if (
                    existedProductWithSameSize.amount + action.payload.amount >
                    3
                ) {
                    existedProductWithSameSize.amount = 3;
                } else {
                    existedProductWithSameSize.amount += action.payload.amount;
                }

                existedProductWithSameSize.total =
                    existedProductWithSameSize.price *
                    existedProductWithSameSize.amount;

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
        changeAmount(state, action) {
            const productWithSpecificSize = state.products.find(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size
            );
            productWithSpecificSize!.amount = action.payload.amount;
        },
        remove(state, action) {
            const productRemoved = state.products.find(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size
            )!;
            const index = state.products.findIndex(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size
            );

            state.totalAmount -= productRemoved.total;
            state.products.splice(index, 1);
        },
    },
});

const CartActions = cartSlice.actions;

export default CartActions;
