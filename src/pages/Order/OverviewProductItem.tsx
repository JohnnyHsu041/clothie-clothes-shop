import s from "../../styles/css/OverviewProductItem.module.css";

interface ProductItemProps {
    id: string;
    img: string;
    name: string;
    size: string;
    amount: number;
    total: number;
}

const OverviewProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <li className={s.product}>
            <div className={s["product__img"]}>
                <img
                    src={process.env.REACT_APP_BACKEND + props.img}
                    alt="product in cart"
                />
            </div>
            <div className={s["product__detail"]}>
                <div className={s.name}>{props.name}</div>
                <div className={s.size}>尺寸：{props.size}</div>
                <div className={s.amount}>數量：{props.amount}</div>
            </div>
            <div className={s["product__total-amount"]}>
                <span>{props.total}</span>
            </div>
        </li>
    );
};

export default OverviewProductItem;
