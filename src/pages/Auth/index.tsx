import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../components/form/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";
import useFormValidity from "../../hooks/useFormValidity";
import Button from "../../components/ui/Button";
import { useNavigate as routerNavigate } from "react-router-dom";
import AuthActions from "../../redux/auth-slice";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import s from "../../styles/css/Auth.module.css";

const Auth: React.FC = () => {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const navigate = routerNavigate();
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const [inputInfoObject, formIsValid, changeHandler, setForm] =
        useFormValidity(
            {
                email: {
                    value: "",
                    isValid: false,
                },
                password: {
                    value: "",
                    isValid: false,
                },
            },
            false
        );

    const { email, password } = inputInfoObject;
    const { value: enteredEmail } = email!;
    const { value: enteredPassword } = password!;

    const switchHandler = () => {
        if (isLogin) {
            setForm(
                {
                    ...inputInfoObject,
                    passwordCheck: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        } else {
            setForm(
                {
                    ...inputInfoObject,
                    passwordCheck: undefined,
                },
                email!.isValid && password!.isValid
            );
        }

        setIsLogin((prev: boolean) => !prev);
    };

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (isLogin) {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}users/login`,
                    "POST",
                    JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                    }),
                    { "Content-Type": "application/json" }
                );

                dispatch(
                    AuthActions.login({
                        userId: responseData.userId,
                        token: responseData.token,
                    })
                );
            } catch (err: any) {
                console.log(err.message);
                return;
            }

            navigate("/");
        } else {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}users/signup`,
                    "POST",
                    JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );

                dispatch(
                    AuthActions.login({
                        userId: responseData.userId,
                        token: responseData.token,
                    })
                );
            } catch (err: any) {
                console.log(err.message);
                return;
            }

            navigate("/");
        }
    };

    return (
        <section className={s.auth}>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <>
                    <div className={s["auth-container"]}>
                        <h2 className={s.title}>
                            {isLogin ? "Sign In" : "Sign Up"}
                        </h2>
                        <form onSubmit={submitHandler}>
                            <Input
                                id="email"
                                type="email"
                                title="電子郵件"
                                placeholder={
                                    isLogin ? "" : "clothy@clothie.com"
                                }
                                errorText="請輸入正確電子郵件格式"
                                validators={[VALIDATOR_EMAIL()]}
                                onChange={changeHandler}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            <Input
                                id="password"
                                type="password"
                                title="密碼"
                                placeholder={
                                    isLogin ? "" : "密碼最少6碼，最多10碼"
                                }
                                errorText="密碼至少需6碼，最多10碼"
                                validators={[
                                    VALIDATOR_MIN_LENGTH(6),
                                    VALIDATOR_MAX_LENGTH(10),
                                ]}
                                onChange={changeHandler}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            {!isLogin && (
                                <Input
                                    id="passwordCheck"
                                    type="password"
                                    title="再次輸入密碼"
                                    validators={[
                                        VALIDATOR_PASSWORD_CHECK(
                                            enteredPassword
                                        ),
                                    ]}
                                    onChange={changeHandler}
                                    errorText="與輸入的密碼不同，請重新輸入"
                                />
                            )}
                            <Button type="submit" disabled={!formIsValid}>
                                <span>{isLogin ? "登入" : "註冊"}</span>
                            </Button>
                        </form>
                        <div className={s["switch-to-registry"]}>
                            <span>{isLogin ? "沒有帳號？" : "已有帳號？"}</span>
                            <Button onClick={switchHandler}>
                                <span>{isLogin ? "註冊" : "登入"}</span>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Auth;
