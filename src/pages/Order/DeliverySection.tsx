import { useRef } from "react";

import s from "../../styles/css/DeliverySection.module.css";

interface DeliverySectionProps {
    onChange: (id: string, value: string, isValid: boolean) => void;
    checked: string;
}

const DeliverySection: React.FC<DeliverySectionProps> = (props) => {
    const standardRef = useRef<HTMLInputElement>(null);
    const expressRef = useRef<HTMLInputElement>(null);

    const selectStandard = () => {
        props.onChange("delivery", "200", true);
    };
    const selectExpress = () => {
        props.onChange("delivery", "500", true);
    };

    return (
        <div className={s.delivery}>
            <h3>運送方式</h3>
            <div className={s["delivery__options"]}>
                <div className={s.standard}>
                    <input
                        ref={standardRef}
                        id="standard"
                        type="radio"
                        value="200"
                        name="delivery"
                        onChange={selectStandard}
                        checked={props.checked === "200"}
                    />
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
                    <input
                        ref={expressRef}
                        id="express"
                        type="radio"
                        value="500"
                        name="delivery"
                        onChange={selectExpress}
                        checked={props.checked === "500"}
                    />
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
