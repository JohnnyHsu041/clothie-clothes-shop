import { useState } from "react";
import Button from "../../components/ui/Button";
import s from "../../styles/css/Order.module.css";
import AddressSection from "./AddressSection";
import Overview from "./Overview";

const Order: React.FC = () => {
    const [deliveryIsFocused, setDeliveryIsFocused] = useState(false);
    const [paymentIsFocused, setPaymentIsFocused] = useState(false);

    return (
        <section className={s.order}>
            <h2>結帳</h2>
            <div className={s.steps}>
                <div className={`${s.address} ${s.focused}`}>寄送資訊</div>
                <div className={s["step-line"]} />
                <div
                    className={`${s.delivery} ${
                        deliveryIsFocused ? s.focused : ""
                    }`}
                >
                    寄送方式
                </div>
                <div className={s["step-line"]} />
                <div
                    className={`${s.payment} ${
                        paymentIsFocused ? s.focused : ""
                    }`}
                >
                    付款資訊
                </div>
            </div>
            <form className={s["order-info"]}>
                <div className={s["buyer-info-container"]}>
                    <div className={s.infos}>
                        <AddressSection />
                    </div>
                    <div className={s["step-buttons"]}>
                        <div className={s.prev}>
                            <Button>
                                <span>上一步</span>
                            </Button>
                        </div>
                        <div className={s.next}>
                            <Button>
                                <span>下一步 &rarr;</span>
                            </Button>
                            {/* <Button type="submit">
                                <span>結帳</span>
                            </Button> */}
                        </div>
                    </div>
                </div>
                <div className={s["overview-container"]}>
                    <Overview />
                </div>
            </form>
        </section>
    );
};

export default Order;
