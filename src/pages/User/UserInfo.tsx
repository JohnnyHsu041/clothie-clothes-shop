import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAX_LENGTH,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_PASSWORD_CHECK,
} from "../../utils/validator";

import s from "../../styles/css/UserInfo.module.css";
import { FormEvent } from "react";

interface UserInfoProps {
    modifyHandler: (event: FormEvent) => void;
    changeHandler: (id: string, value: string, isValid: boolean) => void;
    email: string;
    enteredNewPassword: string;
    formIsValid: boolean;
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
    return (
        <div className={s["user-info"]}>
            <form onSubmit={props.modifyHandler}>
                <Input
                    readonly
                    id="email"
                    type="email"
                    title="電子郵件"
                    initValue={props.email}
                    validators={[VALIDATOR_EMAIL()]}
                    onChange={() => {}}
                    style={{ marginBottom: "0.8rem" }}
                />
                <Input
                    id="oldPassword"
                    type="password"
                    title="舊密碼"
                    errorText="舊密碼長度錯誤"
                    validators={[
                        VALIDATOR_MIN_LENGTH(6),
                        VALIDATOR_MAX_LENGTH(10),
                    ]}
                    onChange={props.changeHandler}
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
                    onChange={props.changeHandler}
                    style={{ marginBottom: "0.8rem" }}
                />
                <Input
                    id="newPasswordCheck"
                    type="password"
                    title="再次輸入新密碼"
                    validators={[
                        VALIDATOR_PASSWORD_CHECK(props.enteredNewPassword),
                    ]}
                    onChange={props.changeHandler}
                    errorText="與輸入的密碼不同，請重新輸入"
                />

                <Button type="submit" disabled={!props.formIsValid}>
                    <span>修改</span>
                </Button>
            </form>
        </div>
    );
};

export default UserInfo;
