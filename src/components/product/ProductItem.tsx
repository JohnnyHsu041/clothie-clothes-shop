import { Link } from "react-router-dom";
import s from "../../styles/css/ProductItem.module.css";

interface ProductItemProps {
    id: string;
    key: string;
    name: string;
    image: string;
    price: number;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <li className={s.product}>
            <Link to={`/clothing/${props.id}`}>
                <div className={s["product-container"]}>
                    <div className={s["product-img"]}>
                        <img
                            src={process.env.REACT_APP_BACKEND + props.image}
                            alt="product"
                        />
                    </div>
                    <div className={s["product-info"]}>
                        <div className={s["product-info__text"]}>
                            {props.name}
                        </div>
                        <div className={s["product-info__price"]}>
                            <p>{props.price}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default ProductItem;
