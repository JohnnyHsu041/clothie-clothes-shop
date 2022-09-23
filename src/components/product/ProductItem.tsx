import s from "../../styles/css/ProductItem.module.css";

interface ProductItemProps {
    id: string;
    name: string;
    image: string;
    price: number;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <li className={s.product}>
            <div>
                <div className={s["product-img"]}>
                    <img src={props.image} alt="product" />
                </div>
                <div className={s["product-info"]}>
                    <div className={s["product-info__text"]}>{props.name}</div>
                    <div className={s["product-info__price"]}>
                        <p>{props.price}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProductItem;
