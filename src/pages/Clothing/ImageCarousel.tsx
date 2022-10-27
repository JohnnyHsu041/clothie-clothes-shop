import React from "react";
import { Product } from "../../components/product/ProductList";

interface ImageCarouselProps {
    products: Product[]; // should be changed to images array later
}

type Ref = HTMLUListElement;

const ImageCarousel = React.forwardRef<Ref, ImageCarouselProps>(
    (props, ref) => {
        return (
            <ul ref={ref}>
                {props.products.map((product) => (
                    <li key={product.id}>
                        <img src={product.images[0]} alt="product" />
                    </li>
                ))}
            </ul>
        );
    }
);

export default ImageCarousel;
