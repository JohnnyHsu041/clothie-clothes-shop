import Input from "../../components/form/Input";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MIN_LENGTH,
} from "../../utils/validator";

import s from "../../styles/css/AddressSection.module.css";

interface AddressSectionProps {
    onChange: (id: string, value: string, isValid: boolean) => void;
    value: { [id: string]: string };
    isValid: { [id: string]: boolean };
}

const AddressSection: React.FC<AddressSectionProps> = (props) => {
    return (
        <div className={s.buyer}>
            <h3>個人資料</h3>
            <div className={s.info}>
                <div className={s.name}>
                    <Input
                        id="name"
                        type="text"
                        title="姓名"
                        initValue={props.value.name}
                        initValidity={props.isValid.name}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={props.onChange}
                        errorText="必填"
                    />
                </div>
                <div className={s.contact}>
                    <Input
                        id="email"
                        type="email"
                        title="電子郵件"
                        initValue={props.value.email}
                        initValidity={props.isValid.email}
                        validators={[VALIDATOR_EMAIL()]}
                        onChange={props.onChange}
                        errorText="電子郵件格式錯誤"
                    />
                    <Input
                        id="cellphone"
                        type="tel"
                        title="手機號碼"
                        initValue={props.value.cellphone}
                        initValidity={props.isValid.cellphone}
                        validators={[VALIDATOR_MIN_LENGTH(10)]}
                        onChange={props.onChange}
                        errorText="必填"
                    />
                </div>
                <div className={s.address}>
                    <Input
                        id="address"
                        type="text"
                        title="地址"
                        initValue={props.value.address}
                        initValidity={props.isValid.address}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={props.onChange}
                        errorText="必填"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressSection;
