import ProductItem from "../../components/product/ProductItem";

import featured1 from "../../assets/images/featured-1.jpeg";
import featured2 from "../../assets/images/featured-2.jpeg";
import featured3 from "../../assets/images/featured-3.jpeg";
import featured4 from "../../assets/images/featured-4.jpeg";
import featured5 from "../../assets/images/featured-5.jpeg";

import s from "../../styles/css/Featured.module.css";
import Button from "../../components/ui/Button";
import { MouseEventHandler, useRef } from "react";

const Featured: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);

    let position = 0;
    let widthOfImgPlusGap = 350 + 25;

    const moveLeftHandler: MouseEventHandler = (event) => {
        if (position === 0) {
            return;
        }

        position -= widthOfImgPlusGap;
        carouselRef.current!.style.transform = `translateX(-${position}px)`;
    };

    const moveRightHandler: MouseEventHandler = (event) => {
        if (position === widthOfImgPlusGap * 2) {
            return;
        }

        position += widthOfImgPlusGap;
        carouselRef.current!.style.transform = `translateX(-${position}px)`;
    };

    return (
        <section className={`container ${s.featured}`}>
            <h2 className={s["featured-title"]}>featured.</h2>
            <div className={s["featured-carousel"]}>
                <Button onClick={moveLeftHandler}>
                    <div className={s["featured-carousel__left-arrow"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </div>
                </Button>
                <div className={s.carousel}>
                    <ul ref={carouselRef} className={s["carousel__products"]}>
                        <ProductItem image={featured1} />
                        <ProductItem image={featured2} />
                        <ProductItem image={featured3} />
                        <ProductItem image={featured4} />
                        <ProductItem image={featured5} />
                    </ul>
                </div>
                <Button onClick={moveRightHandler}>
                    <div className={s["featured-carousel__right-arrow"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                </Button>
            </div>
        </section>
    );
};

export default Featured;
