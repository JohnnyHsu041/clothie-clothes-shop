import Input from "../../components/form/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";
import s from "../../styles/css/Auth.module.css";
import useFormValidity from "../../hooks/useFormValidity";
import { FormEvent, useState } from "react";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate as routerNavigate } from "react-router-dom";
import AuthActions from "../../redux/auth-slice";
import { RootState } from "../../redux/store";
import useHttpClient from "../../hooks/useHttpClient";

const Auth: React.FC = () => {
    const { sendRequest } = useHttpClient();

    const navigate = routerNavigate();
    const auth = useSelector((state: RootState) => state.auth);
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

    const dispatch = useDispatch();

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
                        email: responseData.email,
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
                        email: responseData.email,
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
            <div className={s["auth-container"]}>
                <h2 className={s.title}>{isLogin ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={submitHandler}>
                    <Input
                        id="email"
                        type="email"
                        title="電子郵件"
                        placeholder={isLogin ? "" : "clothy@clothie.com"}
                        errorText="請輸入正確電子郵件格式"
                        validators={[VALIDATOR_EMAIL()]}
                        onChange={changeHandler}
                        style={{ marginBottom: "0.8rem" }}
                    />
                    <Input
                        id="password"
                        type="password"
                        title="密碼"
                        placeholder={isLogin ? "" : "密碼最少6碼，最多10碼"}
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
                                VALIDATOR_PASSWORD_CHECK(enteredPassword),
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
        </section>
    );
};

export default Auth;
