import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/form/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";
import useFormValidity from "../../hooks/useFormValidity";
import useHttpClient from "../../hooks/useHttpClient";
import AuthActions from "../../redux/auth-slice";

import s from "../../styles/css/Cta.module.css";

const Cta: React.FC = () => {
    const { sendRequest, error } = useHttpClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputInfoObject, formIsValid, changeHandler] = useFormValidity(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
            passwordCheck: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const { value: enteredEmail } = inputInfoObject.email!;
    const { value: enteredPassword } = inputInfoObject.password!;

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

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

        alert("註冊成功");
        navigate("/user");
    };

    return (
        <section className={`container ${s.cta}`}>
            <div className={s["cta-container"]}>
                <h2 className={s["cta-title"]}>sign up for the latest info.</h2>
                <div className={s["cta-client"]}>
                    <div className={s["cta-img"]} />
                    <div className={s["cta-input"]}>
                        <form onSubmit={submitHandler}>
                            <Input
                                id="email"
                                type="type"
                                title="電子郵件"
                                placeholder="clothy@clothie.com"
                                style={{ marginBottom: "1.6rem" }}
                                validators={[VALIDATOR_EMAIL()]}
                                onChange={changeHandler}
                                errorText="電子郵件格式錯誤"
                            />
                            <Input
                                id="password"
                                type="password"
                                title="密碼"
                                placeholder="密碼最少6碼，最多10碼"
                                style={{ marginBottom: "0.8rem" }}
                                validators={[
                                    VALIDATOR_MIN_LENGTH(6),
                                    VALIDATOR_MAX_LENGTH(10),
                                ]}
                                onChange={changeHandler}
                                errorText="密碼格式錯誤"
                            />
                            <Input
                                id="passwordCheck"
                                type="password"
                                title="再次輸入密碼"
                                style={{ marginBottom: "3.2rem" }}
                                validators={[
                                    VALIDATOR_PASSWORD_CHECK(enteredPassword),
                                ]}
                                onChange={changeHandler}
                                errorText="與輸入的密碼不同，請重新輸入"
                            />
                            <Button type="submit" disabled={!formIsValid}>
                                註冊
                            </Button>
                        </form>
                        {error && <p className={s["error-message"]}>{error}</p>}
                        <div className={s["cta__switch-to-login"]}>
                            <span>已有帳號？</span>
                            <Link to="/auth">登入</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
