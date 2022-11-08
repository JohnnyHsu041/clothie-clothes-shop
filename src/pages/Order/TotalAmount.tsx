import s from "../../styles/css/TotalAmount.module.css";

interface TotalAmountProps {
    totalAmount: number;
    deliveryAmount: string;
}

const TotalAmount: React.FC<TotalAmountProps> = (props) => {
    const deliveryAmount = +props.deliveryAmount;

    return (
        <>
            <div className={s.summary}>
                <div className={s.title}>小結</div>
                <div className={s["summary-amount"]}>
                    <span>{props.totalAmount}</span>
                </div>
            </div>
            <div className={s.delivery}>
                <div className={s.title}>運費</div>
                <div className={s["delivery-amount"]}>
                    <span>{deliveryAmount}</span>
                </div>
            </div>
            <div className={s.total}>
                <div className={s["total-title"]}>總結</div>
                <div className={s["total-amount"]}>
                    <span>{props.totalAmount + deliveryAmount}</span>
                </div>
            </div>
        </>
    );
};

export default TotalAmount;
