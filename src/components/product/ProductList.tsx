import React from "react";
import ProductItem from "./ProductItem";

import s from "../../styles/css/ProductList.module.css";

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface ProductListProps {
    className: string;
    products: Product[];
}

type Ref = HTMLUListElement;

const ProductList = React.forwardRef<Ref, ProductListProps>((props, ref) => {
    return (
        <ul ref={ref} className={s[props.className]}>
            {props.products.map((product) => (
                <ProductItem
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                />
            ))}
        </ul>
    );
});

export default ProductList;
