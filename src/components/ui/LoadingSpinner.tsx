import s from "../../styles/css/LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
    return (
        <div className={s["loading-spinner"]}>
            <div className={s["spinning-ring"]}></div>
        </div>
    );
};

export default LoadingSpinner;
