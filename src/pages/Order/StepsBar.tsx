import s from "../../styles/css/StepsBar.module.css";

interface StepsBarProps {
    step: number;
    isLastStep: boolean;
}

const StepsBar: React.FC<StepsBarProps> = (props) => {
    return (
        <div className={s.steps}>
            <div className={`${s.address} ${s.focused}`}>個人資料</div>
            <div
                className={`${s["step-line"]} ${
                    props.step >= 2 ? s.passed : ""
                }`}
            />
            <div
                className={`${s.delivery} ${props.step >= 2 ? s.focused : ""}`}
            >
                運送方式
            </div>
            <div
                className={`${s["step-line"]} ${
                    props.isLastStep ? s.passed : ""
                }`}
            />
            <div
                className={`${s.payment} ${props.isLastStep ? s.focused : ""}`}
            >
                付款資訊
            </div>
        </div>
    );
};

export default StepsBar;
