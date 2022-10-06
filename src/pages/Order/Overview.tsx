import s from "../../styles/css/Overview.module.css";
import OverviewProducts from "./OverviewProducts";
import TotalAmount from "./TotalAmount";

const Overview: React.FC = () => {
    return (
        <div className={s.overview}>
            <h3>總覽</h3>
            <div className={s["products-container"]}>
                <OverviewProducts />
            </div>
            <div className={s["total-amount-container"]}>
                <TotalAmount />
            </div>
        </div>
    );
};

export default Overview;
