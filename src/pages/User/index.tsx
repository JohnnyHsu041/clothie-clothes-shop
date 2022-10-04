import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";

import useFormValidity from "../../hooks/useFormValidity";
import s from "../../styles/css/User.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const User: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const [inputInfoObject, formIsValid, changeHandler] = useFormValidity(
        {
            email: {
                value: auth.accounts[0].email,
                isValid: true,
            },
            oldPassword: {
                value: "",
                isValid: false,
            },
            newPassword: {
                value: "",
                isValid: false,
            },
            newPasswordCheck: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const { value: enteredNewPassword } = inputInfoObject.newPassword!;

    const modifyHandler = () => {};

    return (
        <section className={`container ${s["user-container"]}`}>
            <div className={s.user}>
                <nav className={s.catalog}>
                    <div className={s["catalog__user"]}>
                        <Button>會員資料</Button>
                    </div>
                    <div className={s["catalog__order"]}>
                        <Button>訂單記錄</Button>
                    </div>
                </nav>
                <div className={s["info-section"]}>
                    <div className={s["user-info"]}>
                        <form onSubmit={modifyHandler}>
                            <Input
                                readonly
                                id="email"
                                type="email"
                                title="電子郵件"
                                initValue={auth.accounts[0].email}
                                validators={[VALIDATOR_EMAIL()]}
                                onChange={() => {}}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            <Input
                                id="oldPassword"
                                type="password"
                                title="舊密碼"
                                errorText="與舊密碼不符"
                                validators={[
                                    VALIDATOR_MIN_LENGTH(6),
                                    VALIDATOR_MAX_LENGTH(10),
                                ]}
                                onChange={changeHandler}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            <Input
                                id="newPassword"
                                type="password"
                                title="新密碼"
                                errorText="密碼至少需6碼，最多10碼"
                                validators={[
                                    VALIDATOR_MIN_LENGTH(6),
                                    VALIDATOR_MAX_LENGTH(10),
                                ]}
                                onChange={changeHandler}
                                style={{ marginBottom: "0.8rem" }}
                            />
                            <Input
                                id="newPasswordCheck"
                                type="password"
                                title="再次輸入新密碼"
                                validators={[
                                    VALIDATOR_PASSWORD_CHECK(
                                        enteredNewPassword
                                    ),
                                ]}
                                onChange={changeHandler}
                                errorText="與輸入的密碼不同，請重新輸入"
                            />

                            <Button type="submit" disabled={!formIsValid}>
                                <span>修改</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;
