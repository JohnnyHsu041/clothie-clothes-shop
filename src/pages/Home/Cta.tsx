import { FormEvent } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/form/Input";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";

import s from "../../styles/css/Cta.module.css";
import useFormValidity from "../../hooks/useFormValidity";

const Cta: React.FC = () => {
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

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    const { value: enteredPassword } = inputInfoObject.password!;

    return (
        <section className={`container ${s.cta}`}>
            <div className={s["cta-container"]}>
                <h2 className={s["cta-title"]}>
                    sign up, to get the latest info.
                </h2>
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
