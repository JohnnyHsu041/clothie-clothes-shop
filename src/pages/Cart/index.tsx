import { useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import { RootState } from "../../redux/store";
import s from "../../styles/css/Cart.module.css";
import CartProductList from "./CartProductList";

const Cart: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { totalAmount } = cart;

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
                    <CartProductList />
                </div>
                <div className={s["amount-container"]}>
                    <div className={s.amount}>
                        <span>小結</span>
                        <div className={s["total-amount"]}>
                            <span>{totalAmount}</span>
                        </div>
                        <Button type="link">結帳</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
