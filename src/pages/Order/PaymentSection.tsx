import Input from "../../components/form/Input";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MIN_LENGTH,
    VALIDATOR_MAX_LENGTH,
} from "../../utils/validator";
import s from "../../styles/css/PaymentSection.module.css";

interface PaymentSectionProps {
    onChange: (id: string, value: string, isValid: boolean) => void;
    value: {
        [id: string]: string;
    };
    isValid: {
        [id: string]: boolean;
    };
}

const PaymentSection: React.FC<PaymentSectionProps> = (props) => {
    return (
        <div className={s.payment}>
            <h3>付款資訊</h3>
            <div className={s["payment-infos"]}>
                <Input
                    title="信用卡卡號"
                    type="text"
                    id="creditCardNumber"
                    initValue={props.value.creditCardNumber}
                    initValidity={props.isValid.creditCardNumber}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN_LENGTH(16)]}
                    onChange={props.onChange}
                    placeholder="0000111122223333"
                    errorText="輸入錯誤"
                />
                <Input
                    title="持卡人姓名"
                    type="text"
                    id="cardHolder"
                    initValue={props.value.cardHolder}
                    initValidity={props.isValid.cardHolder}
                    validators={[VALIDATOR_REQUIRE()]}
                    onChange={props.onChange}
                    placeholder="XIAO MING WANG"
                    errorText="輸入錯誤"
                />
                <div className={s["expiration-and-CVC"]}>
                    <Input
                        title="有效期限"
                        type="text"
                        id="cardExpiration"
                        initValue={props.value.cardExpiration}
                        initValidity={props.isValid.cardExpiration}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={props.onChange}
                        placeholder="MM / YY"
                        errorText="輸入錯誤"
                    />
                    <Input
                        title="CVC/CCV"
                        type="text"
                        id="cvc"
                        initValue={props.value.cvc}
                        initValidity={props.isValid.cvc}
                        validators={[
                            VALIDATOR_MIN_LENGTH(3),
                            VALIDATOR_MAX_LENGTH(3),
                        ]}
                        onChange={props.onChange}
                        placeholder="000"
                        errorText="輸入錯誤"
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
