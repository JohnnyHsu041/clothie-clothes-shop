import { FormEvent } from "react";
import Button from "../../components/ui/Button";
import useMultiSteps from "../../hooks/useMultiSteps";
import s from "../../styles/css/Order.module.css";
import AddressSection from "./AddressSection";
import DeliverySection from "./DeliverySection";
import Overview from "./Overview";

const Order: React.FC = () => {
    const [currentStep, isFirstStep, isLastStep, nextStep, prevStep] =
        useMultiSteps(1, 3);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <section className={s.order}>
            <h2>訂單建立</h2>
            <div className={s.steps}>
                <div className={`${s.address} ${s.focused}`}>個人資料</div>
                <div
                    className={`${s["step-line"]} ${
                        currentStep >= 2 ? s.passed : ""
                    }`}
                />
                <div
                    className={`${s.delivery} ${
                        currentStep >= 2 ? s.focused : ""
                    }`}
                >
                    運送方式
                </div>
                <div
                    className={`${s["step-line"]} ${
                        isLastStep ? s.passed : ""
                    }`}
                />
                <div className={`${s.payment} ${isLastStep ? s.focused : ""}`}>
                    付款資訊
                </div>
            </div>
            <form className={s["order-info"]} onSubmit={submitHandler}>
                <div className={s["buyer-info-container"]}>
                    <div className={s.infos}>
                        {isFirstStep && <AddressSection />}
                        {currentStep === 2 && <DeliverySection />}
                    </div>
                    <div className={s["step-buttons"]}>
                        <div className={s.prev}>
                            {!isFirstStep && (
                                <Button onClick={prevStep}>
                                    <span>上一步</span>
                                </Button>
                            )}
                        </div>
                        <div className={s.next}>
                            {!isLastStep ? (
                                <div>
                                    <Button onClick={nextStep}>
                                        <span>下一步 &rarr;</span>
                                    </Button>
                                </div>
                            ) : (
                                <div className={s.check}>
                                    <Button type="submit">
                                        <span>確認下單</span>
                                    </Button>
                                </div>
                            )}
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
