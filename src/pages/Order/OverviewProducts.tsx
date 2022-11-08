import { v4 as uuidv4 } from "uuid";

import { Product } from "../../redux/cart-slice";
import s from "../../styles/css/OverviewProducts.module.css";
import OverviewProductItem from "./OverviewProductItem";

interface OverviewProductsProps {
    cartProducts: Product[];
}

const OverviewProducts: React.FC<OverviewProductsProps> = (props) => {
    const cartProducts = props.cartProducts;
    let newProductArray = [];

    for (let product of cartProducts) {
        for (const size in product.size) {
            const key = uuidv4();

            let newProduct = {
                ...product,
                key,
                size,
                amount: product.size[size],
                total: product.price * product.size[size],
            };

            newProductArray.push(newProduct);
        }
    }

    return (
        <ul className={s.products}>
            {newProductArray.map((product) => {
                return (
                    <OverviewProductItem
                        id={product.id}
                        key={product.key}
                        img={product.firstImage}
                        name={product.name}
                        size={product.size}
                        amount={product.amount}
                        total={product.total}
                    />
                );
            })}
        </ul>
    );
};

export default OverviewProducts;
