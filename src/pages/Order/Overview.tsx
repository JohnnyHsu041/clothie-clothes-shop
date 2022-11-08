import { Product } from "../../redux/cart-slice";
import s from "../../styles/css/Overview.module.css";
import OverviewProducts from "./OverviewProducts";
import TotalAmount from "./TotalAmount";

interface OverviewProps {
    deliveryAmount: string;
    cartProducts: Product[];
    totalAmount: number;
}

const Overview: React.FC<OverviewProps> = (props) => {
    return (
        <div className={s.overview}>
            <h3>總覽</h3>
            <div className={s["products-container"]}>
                <OverviewProducts cartProducts={props.cartProducts} />
            </div>
            <div className={s["total-amount-container"]}>
                <TotalAmount
                    totalAmount={props.totalAmount}
                    deliveryAmount={props.deliveryAmount}
                />
            </div>
        </div>
    );
};

export default Overview;
