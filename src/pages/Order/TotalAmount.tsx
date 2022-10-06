import s from "../../styles/css/TotalAmount.module.css";

const TotalAmount: React.FC = () => {
    return (
        <>
            <div className={s.summary}>
                <div className={s.title}>小結</div>
                <div className={s["summary-amount"]}>
                    <span>{1690 * 3}</span>
                </div>
            </div>
            <div className={s.delivery}>
                <div className={s.title}>運費</div>
                <div className={s["delivery-amount"]}>
                    <span>200</span>
                </div>
            </div>
            <div className={s.total}>
                <div className={s["total-title"]}>總結</div>
                <div className={s["total-amount"]}>
                    <span>{1690 * 3 + 200}</span>
                </div>
            </div>
        </>
    );
};

export default TotalAmount;
