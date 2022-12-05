import { MouseEventHandler, useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Arrow from "../../../components/ui/Arrow";
import Button from "../../../components/ui/Button";
import useCarouselArrow from "../../../hooks/useCarouselArrow";
import ImageCarousel from "./ImageCarousel";
import CartActions, { Product } from "../../../redux/cart-slice";
import useProductInfo from "../../../hooks/useProductInfo";
import useHttpClient from "../../../hooks/useHttpClient";
import ErrorModal from "../../../components/ui/ErrorModal";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

import s from "../../../styles/css/SingleProduct.module.css";

const SingleProduct: React.FC = () => {
    const productId = window.location.pathname.split("/clothing/products/")[1];
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const {
        triggerSizeM,
        triggerSizeS,
        sizeSIsTriggered,
        sizeMIsTriggered,
        plusHandler,
        minusHandler,
        productInfo,
        setProductInfo,
    } = useProductInfo();

    const dispatch = useDispatch();

    const carouselRef = useRef<HTMLUListElement>(null);
    const [productWidth, setProdcutWidth] = useState(0);
    const [prev, next] = useCarouselArrow(
        1,
        0,
        productInfo.images.length,
        productWidth,
        carouselRef
    );

    const addtoCart = () => {
        if (localStorage.getItem("clothie-cart")) {
            const storedProduct = JSON.parse(
                localStorage.getItem("clothie-cart")!
            ).products.find((product: Product) => product.id === productId);

            if (storedProduct && storedProduct.amount >= 3) {
                alert("超過下單總件數3件，總件數以3件計算");
                return;
            }
        }

        dispatch(CartActions.add({ ...productInfo, id: productInfo.id }));
    };

    const directToCart: MouseEventHandler<HTMLLinkElement> = (event) => {
        if (localStorage.getItem("clothie-cart")) {
            const storedProduct = JSON.parse(
                localStorage.getItem("clothie-cart")!
            ).products.find((product: Product) => product.id === productId);

            if (storedProduct && storedProduct.amount >= 3) {
                alert("超過下單總件數3件，總件數以3件計算");
                event.preventDefault();

                return;
            }
        }

        dispatch(CartActions.add({ ...productInfo, id: productInfo.id }));
    };

    useEffect(() => {
        const coords = carouselRef.current?.getBoundingClientRect();

        window.addEventListener("resize", () => {
            const coords = carouselRef.current?.getBoundingClientRect();
            setProdcutWidth(coords!.width);
        });

        setProdcutWidth(coords!.width);
    }, []);

    useEffect(() => {
        const getProductById = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}products/${productId}`
                );

                setProductInfo({ ...responseData.product[0], amount: 1 });
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getProductById();
    }, [sendRequest, setProductInfo, productId]);

    return (
        <section className="page">
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner />}
            {!isLoading && productInfo && (
                <>
                    <div className={s["single-product"]}>
                        <div className={s["single-product__img"]}>
                            <div className={s["img-carousel"]}>
                                <Button onClick={prev}>
                                    <Arrow type="left" />
                                </Button>
                                <div className={s["carousel-container"]}>
                                    <ImageCarousel
                                        ref={carouselRef}
                                        images={productInfo.images}
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
                                    {productInfo.newIn && (
                                        <div className={s["product-info__tag"]}>
                                            <span>新品</span>
                                        </div>
                                    )}
                                    <div className={s["product-info__name"]}>
                                        <span>{productInfo.name}</span>
                                    </div>
                                    <div className={s["product-info__price"]}>
                                        <span>{productInfo.price}</span>
                                    </div>
                                    <div className={s["product-info__detail"]}>
                                        <p>韓國製造</p>
                                        <p>*實際顏色依單品照為主</p>
                                        <p>
                                            *單一產品不分尺寸，最多下單件數為3件
                                        </p>
                                    </div>
                                </div>
                                <div className={s["client-input"]}>
                                    <div className={s["product-info__size"]}>
                                        <div
                                            className={
                                                sizeSIsTriggered
                                                    ? s.triggered
                                                    : ""
                                            }
                                            onClick={triggerSizeS}
                                        >
                                            S
                                        </div>
                                        <div
                                            className={
                                                sizeMIsTriggered
                                                    ? s.triggered
                                                    : ""
                                            }
                                            onClick={triggerSizeM}
                                        >
                                            M
                                        </div>
                                    </div>
                                    <div className={s["product-info__amount"]}>
                                        <Button onClick={minusHandler}>
                                            <span>&minus;</span>
                                        </Button>
                                        <input
                                            type="text"
                                            readOnly
                                            value={productInfo.amount}
                                            min="1"
                                            max="3"
                                        />
                                        <Button onClick={plusHandler}>
                                            <span>&#43;</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className={s["btn-container"]}>
                                    <Button
                                        className={s["cart-btn"]}
                                        onClick={addtoCart}
                                    >
                                        <span>加入購物車</span>
                                    </Button>
                                    <Button
                                        className={s["purchase-btn"]}
                                        type="link"
                                        dest="/cart"
                                        onClick={directToCart}
                                    >
                                        <span>立即購買</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default SingleProduct;
