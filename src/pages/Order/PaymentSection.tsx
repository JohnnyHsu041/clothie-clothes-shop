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
        creditCardNumber: string;
        cardHolder: string;
        cardExpiration: string;
        cvc: string;
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
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN_LENGTH(16)]}
                    onChange={props.onChange}
                    placeholder="0000 1111 2222 3333"
                />
                <Input
                    title="持卡人姓名"
                    type="text"
                    id="cardHolder"
                    initValue={props.value.cardHolder}
                    validators={[VALIDATOR_REQUIRE()]}
                    onChange={props.onChange}
                    placeholder="HAO CHE HSU"
                />
                <div className={s["expiration-and-CVC"]}>
                    <Input
                        title="有效期限"
                        type="text"
                        id="cardExpiration"
                        initValue={props.value.cardExpiration}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={props.onChange}
                        placeholder="MM / YY"
                    />
                    <Input
                        title="CVC/CCV"
                        type="text"
                        id="cvc"
                        initValue={props.value.cvc}
                        validators={[
                            VALIDATOR_MIN_LENGTH(3),
                            VALIDATOR_MAX_LENGTH(3),
                        ]}
                        onChange={props.onChange}
                        placeholder="000"
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
