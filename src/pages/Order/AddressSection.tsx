import Input from "../../components/form/Input";
import s from "../../styles/css/AddressSection.module.css";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MIN_LENGTH,
} from "../../utils/validator";

interface AddressSectionProps {
    onChange: (id: string, value: string, isValid: boolean) => void;
    value: { [id: string]: string };
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
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={props.onChange}
                        errorText="必填"
                    />
                </div>
                <div className={s.contact}>
                    <Input
                        readonly
                        id="email"
                        type="email"
                        title="電子郵件"
                        initValue="clothy@clothie.com"
                        validators={[VALIDATOR_EMAIL()]}
                        onChange={() => {}}
                    />
                    <Input
                        id="cellphone"
                        type="tel"
                        title="手機號碼"
                        initValue={props.value.cellphone}
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
