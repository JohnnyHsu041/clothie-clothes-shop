import { useCallback, useReducer } from "react";
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

interface InputInfo {
    [props: string]: {
        value: string;
        isValid: boolean;
    };
}

interface formInfo {
    inputInfoObject: InputInfo;
    formIsValid: boolean;
}

interface formInfoAction {
    type: string;
    id: string;
    value: string;
    isValid: boolean;
}

const formInfoHandler = (state: formInfo, action: formInfoAction) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (let inputId in state.inputInfoObject) {
                if (!state.inputInfoObject[inputId]) continue;

                if (inputId === action.id) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid =
                        formIsValid && state.inputInfoObject[inputId].isValid;
                }
            }

            return {
                ...state,
                inputInfoObject: {
                    ...state.inputInfoObject,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                formIsValid,
            };
        default:
            return state;
    }
};

const Cta: React.FC = () => {
    const [formInfo, dispatch] = useReducer(formInfoHandler, {
        inputInfoObject: {
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
        formIsValid: false,
    });

    const changeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: "INPUT_CHANGE", id, value, isValid });
        },
        []
    );

    console.log(formInfo);
    const { formIsValid, inputInfoObject } = formInfo;
    const { value: enteredPassword } = inputInfoObject.password;

    return (
        <section className={`container ${s.cta}`}>
            <div className={s["cta-container"]}>
                <h2 className={s["cta-title"]}>
                    sign up now for the latest info.
                </h2>
                <div className={s["cta-client"]}>
                    <div className={s["cta-img"]} />
                    <div className={s["cta-input"]}>
                        <form>
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
                                style={{ marginBottom: "0.8rem" }}
                                validators={[
                                    VALIDATOR_MIN_LENGTH(6),
                                    VALIDATOR_MAX_LENGTH(10),
                                ]}
                                onChange={changeHandler}
                                errorText="密碼最少6碼，最多不可超過10碼"
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
