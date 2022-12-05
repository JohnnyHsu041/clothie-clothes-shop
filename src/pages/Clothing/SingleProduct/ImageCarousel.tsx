import React from "react";

import { v4 as uuidv4 } from "uuid";

interface ImageCarouselProps {
    images: string[];
}

type Ref = HTMLUListElement;

const ImageCarousel = React.forwardRef<Ref, ImageCarouselProps>(
    (props, ref) => {
        return (
            <ul ref={ref}>
                {props.images.map((image) => {
                    const key = uuidv4();

                    return (
                        <li key={key}>
                            <img
                                src={
                                    image
                                        ? `${process.env.REACT_APP_BACKEND_URL}${image}`
                                        : ""
                                }
                                alt="one of the product images"
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }
);

export default ImageCarousel;
