import React from "react";
import { Product } from "../../components/product/ProductList";

interface ImageCarouselProps {
    products: Product[];
}

type Ref = HTMLUListElement;

const ImageCarousel = React.forwardRef<Ref, ImageCarouselProps>(
    (props, ref) => {
        return (
            <ul ref={ref}>
                {props.products.map((product) => (
                    <li key={product.id}>
                        <img src={product.image} alt="product" />
                    </li>
                ))}
            </ul>
        );
    }
);

export default ImageCarousel;
