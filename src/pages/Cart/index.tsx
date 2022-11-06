import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/ui/Button";
import CartActions, { CartDataFormat } from "../../redux/cart-slice";
import s from "../../styles/css/Cart.module.css";
import CartProductList from "./CartProductList";

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const [loadedCartData, setLoadedCartData] = useState<CartDataFormat>({
        products: [],
        amountOfProducts: 0,
        totalAmount: 0,
    });

    useEffect(() => {
        if (localStorage.getItem("clothie-cart")) {
            const cart = JSON.parse(localStorage.getItem("clothie-cart")!);

            setLoadedCartData(cart);
        }
    }, []);

    const changeAmountHandler = (id: string, size: string, amount: number) => {
        dispatch(CartActions.changeAmount({ id, size, amount }));

        const cart = JSON.parse(localStorage.getItem("clothie-cart")!);

        setLoadedCartData(cart);
    };

    const removeProductHandler = (id: string, size: string) => {
        dispatch(CartActions.remove({ id, size }));

        if (localStorage.getItem("clothie-cart")) {
            const cart = JSON.parse(localStorage.getItem("clothie-cart")!);

            setLoadedCartData(cart);
        } else {
            setLoadedCartData({
                products: [],
                amountOfProducts: 0,
                totalAmount: 0,
            });
        }
    };

    return (
        <section className={s.cart}>
            <div className={s["cart-container"]}>
                <div className={s["product-list"]}>
                    <div className={s["type-bar"]}>
                        <div>產品名稱</div>
                        <div>尺寸</div>
                        <div>數量</div>
                        <div>
                            <span>價格</span>
                        </div>
                    </div>
                    <div className={s.division} />
                    {loadedCartData && (
                        <CartProductList
                            products={loadedCartData.products}
                            removeHandler={removeProductHandler}
                            changeAmountHandler={changeAmountHandler}
                        />
                    )}
                </div>
                <div className={s["amount-container"]}>
                    <div className={s.amount}>
                        <span>小結</span>
                        <div className={s["total-amount"]}>
                            <span>{loadedCartData.totalAmount}</span>
                        </div>
                        <Button type="link" dest="/order/o1">
                            結帳
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
