import React, { useEffect, useRef, useState } from "react";

import s from "../../styles/css/CartProductItem.module.css";
import Button from "../../components/ui/Button";
import useAmountCount from "../../hooks/useAmountCount";
import { Product } from "../../redux/cart-slice";

interface CartProductItemProps {
    id: string;
    name: string;
    size: string;
    amount: number;
    total: number;
    remove: (id: string, size: string) => void;
    changeAmount: (id: string, size: string, amount: number) => void;
}

const CartProductItem: React.FC<CartProductItemProps> = (props) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const [sizeInfo, setSizeInfo] = useState({
        amountOfSpecificSize: 0,
        amountWithAllSizes: 0,
    });

    const [amount, options] = useAmountCount(
        sizeInfo.amountOfSpecificSize,
        sizeInfo.amountWithAllSizes
    );

    useEffect(() => {
        if (localStorage.getItem("clothie-cart")) {
            const product = JSON.parse(
                localStorage.getItem("clothie-cart")!
            ).products.find((product: Product) => product.id === props.id);

            setSizeInfo({
                amountOfSpecificSize: product.size[props.size],
                amountWithAllSizes: product.amount,
            });
        }
    }, [props.id, props.size]);

    const changeAmountHandler = () => {
        const amount = +selectRef.current!.value;

        props.changeAmount(props.id, props.size, amount);

        const product = JSON.parse(
            localStorage.getItem("clothie-cart")!
        ).products.find((product: Product) => product.id === props.id);

        setSizeInfo({
            amountOfSpecificSize: amount,
            amountWithAllSizes: product.amount,
        });
    };

    const removeHandler = () => {
        props.remove(props.id, props.size);
    };

    return (
        <li className={s.product}>
            <div className={s["product-name"]}>{props.name}</div>
            <div className={s["product-size"]}>{props.size}</div>
            <div className={s["product-amount"]}>
                <select
                    ref={selectRef}
                    onChange={changeAmountHandler}
                    value={amount}
                >
                    {options.map((option) => {
                        return <option>{option}</option>;
                    })}
                </select>
                <Button onClick={removeHandler}>
                    <span>刪除</span>
                </Button>
            </div>
            <div className={s["product-price"]}>{props.total}</div>
        </li>
    );
};

export default CartProductItem;
