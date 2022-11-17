import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import useFormValidity from "../../hooks/useFormValidity";
import useMultiSteps from "../../hooks/useMultiSteps";
import CartActions, { CartDataFormat } from "../../redux/cart-slice";
import AddressSection from "./AddressSection";
import DeliverySection from "./DeliverySection";
import Overview from "./Overview";
import PaymentSection from "./PaymentSection";
import useHttpClient from "../../hooks/useHttpClient";
import StepsBar from "./StepsBar";
import { RootState } from "../../redux/store";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorModal from "../../components/ui/ErrorModal";

import s from "../../styles/css/Order.module.css";

const Order: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const token = useSelector((state: RootState) => state.auth.token);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cart, setCart] = useState<CartDataFormat>({
        products: [],
        amountOfProducts: 0,
        totalAmount: 0,
    });
    const [inputInfoObject, formIsValid, changeHandler] = useFormValidity(
        {
            name: {
                value: "",
                isValid: false,
            },
            email: {
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
        email,
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

        const sendOrder = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}orders`,
                    "POST",
                    JSON.stringify({
                        orderInfo: {
                            orderName: name!.value,
                            email: email!.value,
                            contact: cellphone!.value,
                            address: address!.value,
                            typeOfDelivery: delivery!.value,
                        },
                        products: cart.products,
                        amount: cart.amountOfProducts,
                        totalAmount: cart.totalAmount + +delivery!.value,
                        buyer: userId,
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }
                );

                dispatch(CartActions.removeWholeCart());

                navigate(`/order/completed/${responseData.orderId}`, {
                    replace: true,
                });
            } catch (err: any) {
                console.log(err.message);
            }
        };

        sendOrder();
    };

    return (
        <section className={s.order}>
            {isLoading && <LoadingSpinner />}
            {error && <ErrorModal error={error} onClear={clearError} />}
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
                                    email: email!.value,
                                    cellphone: cellphone!.value,
                                    address: address!.value,
                                }}
                                isValid={{
                                    name: name!.isValid,
                                    email: email!.isValid,
                                    cellphone: cellphone!.isValid,
                                    address: address!.isValid,
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
                                isValid={{
                                    creditCardNumber: creditCardNumber!.isValid,
                                    cardHolder: cardHolder!.isValid,
                                    cardExpiration: cardExpiration!.isValid,
                                    cvc: cvc!.isValid,
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
};

export default Order;
