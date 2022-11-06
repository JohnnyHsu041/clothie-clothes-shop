import { createSlice } from "@reduxjs/toolkit";

export interface Product {
    id: string;
    name: string;
    price: number;
    size: {
        [productSize: string]: number;
    };
    amount: number;
    total: number;
}

export interface CartDataFormat {
    products: Product[];
    amountOfProducts: number;
    totalAmount: number;
}

interface AmountOfCartProducts {
    amountOfCartProducts: number;
}

const initialState: AmountOfCartProducts = {
    amountOfCartProducts: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            const productId = action.payload.id;
            const productName = action.payload.name;
            const productSize = action.payload.size;
            const productPrice = action.payload.price;
            const productAmount = action.payload.amount;

            if (localStorage.getItem("clothie-cart")) {
                const storedData = JSON.parse(
                    localStorage.getItem("clothie-cart")!
                );

                const existingProduct = storedData.products.find(
                    (product: Product) => product.id === productId
                );
                if (existingProduct) {
                    let currentAmount: number = existingProduct.amount;
                    let addedAmount: number;

                    if (currentAmount + productAmount > 3) {
                        addedAmount = 3 - currentAmount;
                        state.amountOfCartProducts += addedAmount;
                        currentAmount = 3;
                    } else {
                        state.amountOfCartProducts += productAmount;
                        currentAmount += productAmount;
                    }

                    const data: CartDataFormat = {
                        ...storedData,
                        products: [
                            ...storedData.products.filter(
                                (product: Product) =>
                                    product.id !== existingProduct.id
                            ),
                            {
                                ...existingProduct,
                                size: {
                                    ...existingProduct.size,
                                    [productSize]: existingProduct.size[
                                        productSize
                                    ]
                                        ? existingProduct.size[productSize] +
                                          productAmount
                                        : productAmount,
                                },
                                amount: currentAmount,
                                total: existingProduct.price * currentAmount,
                            },
                        ],

                        amountOfProducts: state.amountOfCartProducts,
                        totalAmount: addedAmount!
                            ? storedData.totalAmount +
                              productPrice * addedAmount
                            : storedData.totalAmount +
                              productPrice * productAmount,
                    };

                    localStorage.setItem("clothie-cart", JSON.stringify(data));

                    return;
                }

                state.amountOfCartProducts += productAmount;

                const data: CartDataFormat = {
                    ...storedData,
                    products: [
                        ...storedData.products,
                        {
                            id: productId,
                            name: productName,
                            price: productPrice,
                            size: {
                                [productSize]: productAmount,
                            },
                            amount: productAmount,
                            total: productPrice * productAmount,
                        },
                    ],

                    amountOfProducts: state.amountOfCartProducts,
                    totalAmount: (storedData.totalAmount +=
                        productPrice * productAmount),
                };

                localStorage.setItem("clothie-cart", JSON.stringify(data));
            } else {
                state.amountOfCartProducts = productAmount;

                const data: CartDataFormat = {
                    products: [
                        {
                            id: productId,
                            name: action.payload.name,
                            price: productPrice,
                            size: {
                                [productSize]: productAmount,
                            },
                            amount: productAmount,
                            total: productPrice * productAmount,
                        },
                    ],
                    amountOfProducts: productAmount,
                    totalAmount: productPrice * productAmount,
                };

                localStorage.setItem("clothie-cart", JSON.stringify(data));
            }
        },
        changeAmount(state, action) {
            const storedData = JSON.parse(
                localStorage.getItem("clothie-cart")!
            );
            const storedProduct = storedData.products.find(
                (product: Product) => product.id === action.payload.id
            );
            const changedAmount =
                action.payload.amount - storedProduct.size[action.payload.size];

            state.amountOfCartProducts += changedAmount;

            storedProduct.size[action.payload.size] = action.payload.amount;
            storedProduct.amount += changedAmount;
            storedProduct.total = storedProduct.price * storedProduct.amount;

            localStorage.setItem(
                "clothie-cart",
                JSON.stringify({
                    products: [...storedData.products],
                    amountOfProducts: state.amountOfCartProducts,
                    totalAmount:
                        storedData.totalAmount +
                        storedProduct.price * changedAmount,
                })
            );
        },
        remove(state, action) {
            const storedData = JSON.parse(
                localStorage.getItem("clothie-cart")!
            );
            const product = storedData.products.find(
                (product: Product) => product.id === action.payload.id
            );
            const deletedAmount = product.size[action.payload.size];

            state.amountOfCartProducts -= deletedAmount;

            let numOfSizes = 0;

            for (let s in product.size) numOfSizes++;

            if (numOfSizes === 1) {
                storedData.products = [
                    ...storedData.products.filter(
                        (product: Product) => product.id !== action.payload.id
                    ),
                ];
            } else {
                product.amount -= deletedAmount;
                product.total -= product.price * product.amount;

                delete product.size[action.payload.size];
            }

            const data: CartDataFormat = {
                products: [...storedData.products],
                amountOfProducts: state.amountOfCartProducts,
                totalAmount:
                    storedData.totalAmount - product.price * deletedAmount,
            };

            localStorage.setItem("clothie-cart", JSON.stringify(data));

            const updatedCart = JSON.parse(
                localStorage.getItem("clothie-cart")!
            );
            if (
                updatedCart.totalAmount <= 0 &&
                updatedCart.amountOfProducts <= 0
            ) {
                localStorage.setItem(
                    "clothie-cart",
                    JSON.stringify({
                        amountOfProducts: 0,
                        products: [],
                        totalAmount: 0,
                    })
                );
            }
        },
    },
});

const CartActions = cartSlice.actions;

export default CartActions;
