import Button from "../../components/ui/Button";
import { useRef } from "react";
import Arrow from "../../components/ui/Arrow";
import ProductList from "../../components/product/ProductList";
import useCarouselArrow from "../../hooks/useCarouselArrow";

import s from "../../styles/css/Featured.module.css";

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

const Featured: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const [prev, next] = useCarouselArrow(3, 0, carouselRef);

    return (
        <section className={`container ${s.featured}`}>
            <h2 className={s["featured-title"]}>featured.</h2>
            <div className={s["featured-carousel"]}>
                <Button onClick={prev}>
                    <Arrow type="left" />
                </Button>
                <div className={s["carousel-container"]}>
                    <ProductList
                        ref={carouselRef}
                        products={DUMMY_PRODUCTS}
                        className="carousel"
                    />
                </div>
                <Button onClick={next}>
                    <Arrow type="right" />
                </Button>
            </div>
        </section>
    );
};

export default Featured;