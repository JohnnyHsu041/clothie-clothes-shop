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
import { useNavigate } from "react-router-dom";
import AuthActions from "../../redux/auth-slice";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import s from "../../styles/css/Auth.module.css";

const Auth: React.FC = () => {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const navigate = useNavigate();
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
                                title="????????????"
                                placeholder={
                                    isLogin ? "" : "clothy@clothie.com"
                                }
                                errorText="?????????????????????????????????"
                                validators={[VALIDATOR_EMAIL()]}
                                onChange={changeHandler}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            <Input
                                id="password"
                                type="password"
                                title="??????"
                                placeholder={
                                    isLogin ? "" : "????????????6????????????10???"
                                }
                                errorText="???????????????6????????????10???"
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
                                    title="??????????????????"
                                    validators={[
                                        VALIDATOR_PASSWORD_CHECK(
                                            enteredPassword
                                        ),
                                    ]}
                                    onChange={changeHandler}
                                    errorText="??????????????????????????????????????????"
                                />
                            )}
                            <Button type="submit" disabled={!formIsValid}>
                                <span>{isLogin ? "??????" : "??????"}</span>
                            </Button>
                        </form>
                        <div className={s["switch-to-registry"]}>
                            <span>{isLogin ? "???????????????" : "???????????????"}</span>
                            <Button onClick={switchHandler}>
                                <span>{isLogin ? "??????" : "??????"}</span>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Auth;
