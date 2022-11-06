import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Product } from "../../redux/cart-slice";
import s from "../../styles/css/CartProductList.module.css";
import CartProductItem from "./CartProductItem";

interface CartProductListProps {
    products: Product[];
    removeHandler: (id: string, size: string) => void;
    changeAmountHandler: (id: string, size: string, amount: number) => void;
}

const CartProductList: React.FC<CartProductListProps> = (props) => {
    const cartProducts = props.products;
    let newProductArray = [];

    for (let product of cartProducts) {
        for (const size in product.size) {
            const key = uuidv4();

            let newProduct = {
                ...product,
                key,
                size,
                amount: product.size[size],
                total: product.price * product.size[size],
            };

            newProductArray.push(newProduct);
        }
    }

    return (
        <ul className={s.products}>
            {newProductArray.map((product) => {
                return (
                    <CartProductItem
                        id={product.id}
                        key={product.key}
                        name={product.name}
                        amount={product.amount}
                        size={product.size}
                        total={product.total}
                        remove={props.removeHandler}
                        changeAmount={props.changeAmountHandler}
                    />
                );
            })}
        </ul>
    );
};

export default CartProductList;
