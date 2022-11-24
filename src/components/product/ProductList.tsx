import React from "react";
import ProductItem from "./ProductItem";

import s from "../../styles/css/ProductList.module.css";

export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    size: string;
    type: string;
    newIn: boolean;
    featured: boolean;
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
                    id={product.id!}
                    key={product.id}
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                    className={props.className}
                />
            ))}
        </ul>
    );
});

export default ProductList;
