import { useRef, useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Arrow from "../../components/ui/Arrow";
import ProductList from "../../components/product/ProductList";
import useCarouselArrow from "../../hooks/useCarouselArrow";
import { Product } from "../../components/product/ProductList";
import useHttpClient from "../../hooks/useHttpClient";

import s from "../../styles/css/Featured.module.css";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Featured: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

    const [showAtOnce, setShowAtOnce] = useState(3);
    const positionToStart = 0;
    const amountOfProducts = 5;
    const [transitDistance, setTransitDistance] = useState(0);

    const [prev, next] = useCarouselArrow(
        showAtOnce,
        positionToStart,
        amountOfProducts,
        transitDistance,
        carouselRef
    );

    useEffect(() => {
        if (loadedProducts && loadedProducts.length > 0) {
            const changeCarouselStyling = () => {
                if (window.innerWidth < 433) {
                    setShowAtOnce(1);
                } else if (window.innerWidth < 1056) {
                    setShowAtOnce(2);
                } else {
                    setShowAtOnce(3);
                }

                const firstProductCoords =
                    carouselRef.current!.children[0].getBoundingClientRect();
                const secondProductCoords =
                    carouselRef.current!.children[1].getBoundingClientRect();

                const gap = secondProductCoords.left - firstProductCoords.right;

                setTransitDistance(firstProductCoords.width + gap);
            };

            window.addEventListener("resize", () => {
                changeCarouselStyling();
            });

            changeCarouselStyling();
        }
    }, [loadedProducts]);

    useEffect(() => {
        const getFeaturedProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}products/featured`
                );

                setLoadedProducts(responseData.products);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getFeaturedProducts();
    }, [sendRequest]);

    return (
        <section className={s.featured}>
            <h2 className={s["featured-title"]}>featured.</h2>
            <div className={s["featured-content"]}>
                {error && <ErrorModal error={error} onClear={clearError} />}
                {isLoading && <LoadingSpinner />}
                {!isLoading && loadedProducts && (
                    <div className={s["featured-carousel"]}>
                        <Button onClick={prev}>
                            <Arrow type="left" />
                        </Button>
                        <div className={s["carousel-container"]}>
                            <ProductList
                                ref={carouselRef}
                                products={loadedProducts}
                                className="featured-carousel"
                            />
                        </div>
                        <Button onClick={next}>
                            <Arrow type="right" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Featured;
