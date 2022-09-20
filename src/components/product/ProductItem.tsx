import Card from "../layout/Card";

import s from "../../styles/css/ProductItem.module.css";

interface ProductItemProps {
    image: string;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <li>
            <Card>
                <div className={s["product-img"]}>
                    <img src={props.image} alt="featured product" />
                </div>
                <div className={s["product-info"]}>
                    <div className={s["product-info__text"]}>content</div>
                    <div className={s["product-info__price"]}>
                        <p>590</p>
                    </div>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
