import React from "react";
import { Product } from "../../components/product/ProductList";

interface ImageCarouselProps {
    images: string[];
}

type Ref = HTMLUListElement;

const ImageCarousel = React.forwardRef<Ref, ImageCarouselProps>(
    (props, ref) => {
        return (
            <ul ref={ref}>
                {props.images.map((image) => (
                    <li>
                        <img
                            src={`http://localhost:8080/${image}`}
                            alt="product"
                        />
                    </li>
                ))}
            </ul>
        );
    }
);

export default ImageCarousel;
