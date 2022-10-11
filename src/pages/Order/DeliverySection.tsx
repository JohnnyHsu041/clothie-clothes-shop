import s from "../../styles/css/DeliverySection.module.css";

const DeliverySection: React.FC = () => {
    return (
        <div className={s.delivery}>
            <h3>運送方式</h3>
            <div className={s["delivery__options"]}>
                <div className={s.standard}>
                    <input id="standard" type="radio" name="delivery" checked />
                    <label htmlFor="standard" className={s.label}>
                        <div className={s["delivery-info"]}>
                            <div className={s["label-title"]}>標準運送</div>
                            <div className={s["label-desc"]}></div>約 21
                            個工作天
                        </div>
                        <div className={s["delivery-price"]}>200</div>
                    </label>
                </div>
                <div className={s.express}>
                    <input id="express" type="radio" name="delivery" />
                    <label htmlFor="express" className={s.label}>
                        <div className={s["delivery-info"]}>
                            <div className={s["label-title"]}>快速運送</div>
                            <div className={s["label-desc"]}></div>約 11-14
                            個工作天
                        </div>
                        <div className={s["delivery-price"]}>500</div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DeliverySection;
