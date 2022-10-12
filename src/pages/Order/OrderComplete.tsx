import Button from "../../components/ui/Button";
import s from "../../styles/css/OrderComplete.module.css";

const OrderComplete: React.FC = () => {
    return (
        <section className={s["order-complete-container"]}>
            <p>訂購完成！</p>
            <div>
                <span>查看訂單詳情</span>
                <Button type="link" dest="/user">
                    訂單記錄
                </Button>
            </div>
        </section>
    );
};

export default OrderComplete;
