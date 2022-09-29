import Button from "../../components/ui/Button";
import s from "../../styles/css/Cart.module.css";

const Cart: React.FC = () => {
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
                    <ul className={s.products}>
                        <li className={s.product}>
                            <div className={s["product-name"]}>香奈兒外套</div>
                            <div className={s["product-size"]}>M</div>
                            <div className={s["product-amount"]}>3</div>
                            <div className={s["product-price"]}>{1690 * 3}</div>
                        </li>
                        <li className={s.product}>
                            <div className={s["product-name"]}>香奈兒外套</div>
                            <div className={s["product-size"]}>M</div>
                            <div className={s["product-amount"]}>3</div>
                            <div className={s["product-price"]}>{1690 * 3}</div>
                        </li>
                    </ul>
                </div>
                <div className={s["amount-container"]}>
                    <div className={s.amount}>
                        <span>小結</span>
                        <div className={s["total-amount"]}>
                            <span>{1690 * 3}</span>
                        </div>
                        <Button type="link">結帳</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
