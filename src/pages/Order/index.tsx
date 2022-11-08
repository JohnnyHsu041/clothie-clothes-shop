import { FormEvent, useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import useFormValidity from "../../hooks/useFormValidity";
import useMultiSteps from "../../hooks/useMultiSteps";
import { CartDataFormat } from "../../redux/cart-slice";
import AddressSection from "./AddressSection";
import DeliverySection from "./DeliverySection";
import OrderComplete from "./OrderComplete";
import Overview from "./Overview";
import PaymentSection from "./PaymentSection";
import StepsBar from "./StepsBar";

import s from "../../styles/css/Order.module.css";

const Order: React.FC = () => {
    const [cart, setCart] = useState<CartDataFormat>({
        products: [],
        amountOfProducts: 0,
        totalAmount: 0,
    });
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [inputInfoObject, formIsValid, changeHandler] = useFormValidity(
        {
            name: {
                value: "",
                isValid: false,
            },
            cellphone: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
            delivery: {
                value: "",
                isValid: false,
            },
            creditCardNumber: {
                value: "",
                isValid: false,
            },
            cardHolder: {
                value: "",
                isValid: false,
            },
            cardExpiration: {
                value: "",
                isValid: false,
            },
            cvc: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const {
        name,
        cellphone,
        address,
        delivery,
        creditCardNumber,
        cardHolder,
        cardExpiration,
        cvc,
    } = inputInfoObject;

    const [currentStep, isFirstStep, isLastStep, nextStep, prevStep] =
        useMultiSteps(1, 3);

    useEffect(() => {
        if (localStorage.getItem("clothie-cart")) {
            const storedProducts = JSON.parse(
                localStorage.getItem("clothie-cart")!
            );

            setCart(storedProducts);
        }
    }, []);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log("works");
        setOrderCompleted(true);
    };

    let content: JSX.Element = orderCompleted ? (
        <OrderComplete />
    ) : (
        <section className={s.order}>
            <h2>訂單建立</h2>
            <StepsBar step={currentStep} isLastStep={isLastStep} />
            <div className={s["order-info"]}>
                <form
                    className={s["buyer-info-container"]}
                    onSubmit={submitHandler}
                >
                    <div className={s.infos}>
                        {isFirstStep && (
                            <AddressSection
                                onChange={changeHandler}
                                value={{
                                    name: name!.value,
                                    cellphone: cellphone!.value,
                                    address: address!.value,
                                }}
                            />
                        )}
                        {currentStep === 2 && (
                            <DeliverySection
                                onChange={changeHandler}
                                checked={delivery!.value}
                            />
                        )}
                        {isLastStep && (
                            <PaymentSection
                                onChange={changeHandler}
                                value={{
                                    creditCardNumber: creditCardNumber!.value,
                                    cardHolder: cardHolder!.value,
                                    cardExpiration: cardExpiration!.value,
                                    cvc: cvc!.value,
                                }}
                            />
                        )}
                    </div>
                    <div className={s["step-buttons"]}>
                        <div className={s.prev}>
                            {!isFirstStep && (
                                <div onClick={prevStep}>
                                    <span>上一步</span>
                                </div>
                            )}
                        </div>
                        {!isLastStep ? (
                            <div className={s.next}>
                                <div onClick={nextStep}>
                                    <span>下一步 &rarr;</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`${s.check} ${
                                    !formIsValid ? s.disabled : ""
                                }`}
                            >
                                <Button type="submit" disabled={!formIsValid}>
                                    <span>確認下單</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
                <div className={s["overview-container"]}>
                    <Overview
                        deliveryAmount={delivery!.value}
                        cartProducts={cart.products}
                        totalAmount={cart.totalAmount}
                    />
                </div>
            </div>
        </section>
    );

    return content;
};

export default Order;
