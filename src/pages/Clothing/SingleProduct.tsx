import { useRef } from "react";
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
                <div className={s["single-product__desc"]}>
                    <div className={s["product-info"]}>
                        <div className={s.info}>
                            <div className={s["product-info__tag"]}>
                                <span>新品</span>
                            </div>
                            <div className={s["product-info__name"]}>
                                <span>香奈兒外套</span>
                            </div>
                            <div className={s["product-info__price"]}>
                                <span>1690</span>
                            </div>
                            <div className={s["product-info__detail"]}>
                                <p>韓國製造</p>
                                <p>*實際顏色依單品照為主</p>
                            </div>
                        </div>
                        <div className={s["client-input"]}>
                            <div className={s["product-info__size"]}>
                                <Button>
                                    <span>S</span>
                                </Button>
                                <Button>
                                    <span>M</span>
                                </Button>
                            </div>
                            <div className={s["product-info__amount"]}>
                                <Button>
                                    <span>&minus;</span>
                                </Button>
                                <input type="text" readOnly value="1" />
                                <Button>
                                    <span>&#43;</span>
                                </Button>
                            </div>
                        </div>
                        <div className={s["btn-container"]}>
                            <Button className={s["cart-btn"]}>
                                <span>加入購物車</span>
                            </Button>
                            <Button
                                className={s["purchase-btn"]}
                                type="link"
                                dest="/cart"
                            >
                                <span>立即購買</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;
