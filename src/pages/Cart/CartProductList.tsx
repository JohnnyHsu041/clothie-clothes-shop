import { useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../redux/cart-slice";

import { RootState } from "../../redux/store";
import s from "../../styles/css/CartProductList.module.css";
import CartProductItem from "./CartProductItem";

const CartProductList: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { products } = cart;

    const [loadedProducts, setLoadedProducts] = useState<Product[]>(products);

    const removeProductHandler = (id: string, size: string) => {
        setLoadedProducts((prev) =>
            prev.filter(
                (product) =>
                    product.id !== id ||
                    (product.id === id && product.size !== size)
            )
        );
    };

    return (
        <ul className={s.products}>
            {loadedProducts.map((product) => {
                return (
                    <CartProductItem
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        amount={product.amount}
                        size={product.size}
                        total={product.total}
                        remove={removeProductHandler}
                    />
                );
            })}
        </ul>
    );
};

export default CartProductList;
