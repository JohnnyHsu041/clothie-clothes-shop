import { useRef } from "react";
import ProductList from "../../components/product/ProductList";
import Arrow from "../../components/ui/Arrow";
import Button from "../../components/ui/Button";
import useCarouselArrow from "../../hooks/useCarouselArrow";

import s from "../../styles/css/SingleProduct.module.css";
import ImageCarousel from "./ImageCarousel";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        name: "channel",
        image: "/images/featured-1.jpeg",
        price: 1690,
        "new-in": true,
        accs: false,
    },
    {
        id: "p2",
        name: "shirt",
        image: "/images/featured-2.jpeg",
        price: 790,
        "new-in": true,
        accs: false,
    },
    {
        id: "p3",
        name: "skirt",
        image: "/images/featured-3.jpeg",
        price: 990,
        "new-in": true,
        accs: false,
    },
    {
        id: "p4",
        name: "pink-channel",
        image: "/images/featured-4.jpeg",
        price: 1290,
        "new-in": true,
        accs: false,
    },
    {
        id: "p5",
        name: "milk tea",
        image: "/images/featured-5.jpeg",
        price: 890,
        "new-in": true,
        accs: false,
    },
];

const SingleProduct: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const [prev, next] = useCarouselArrow(1, 0, carouselRef);

    return (
        <section className="page">
            <div className={s["single-product"]}>
                <div className={s["single-product__img"]}>
                    <div className={s["img-carousel"]}>
                        <Button onClick={prev}>
                            <Arrow type="left" />
                        </Button>
                        <div className={s["carousel-container"]}>
                            <ImageCarousel
                                ref={carouselRef}
                                products={DUMMY_PRODUCTS}
                            />
                        </div>
                        <Button onClick={next}>
                            <Arrow type="right" />
                        </Button>
                    </div>
                </div>
                <div className={s["single-product__desc"]}>desc</div>
            </div>
        </section>
    );
};

export default SingleProduct;
