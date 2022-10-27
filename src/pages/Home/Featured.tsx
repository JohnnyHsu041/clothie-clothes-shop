import { useRef, useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Arrow from "../../components/ui/Arrow";
import ProductList from "../../components/product/ProductList";
import useCarouselArrow from "../../hooks/useCarouselArrow";
import { Product } from "../../components/product/ProductList";
import useHttpClient from "../../hooks/useHttpClient";

import s from "../../styles/css/Featured.module.css";

const Featured: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const [sendRequest] = useHttpClient();

    const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
    const [prev, next] = useCarouselArrow(3, 0, 5, 352.5, carouselRef);

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
        <section className={`container ${s.featured}`}>
            <h2 className={s["featured-title"]}>featured.</h2>
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
        </section>
    );
};

export default Featured;
