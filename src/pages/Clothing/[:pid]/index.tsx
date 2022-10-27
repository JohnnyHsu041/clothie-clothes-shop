import { MouseEventHandler, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Arrow from "../../../components/ui/Arrow";
import Button from "../../../components/ui/Button";
import useCarouselArrow from "../../../hooks/useCarouselArrow";
import ImageCarousel from "../ImageCarousel";
import { RootState } from "../../../redux/store";
import CartActions from "../../../redux/cart-slice";

import s from "../../../styles/css/SingleProduct.module.css";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        name: "channel",
        images: ["/images/featured-1.jpeg"],
        price: 1690,
        size: "S",
        type: "clothe",
        newIn: true,
        featured: true,
    },
    {
        id: "p2",
        name: "shirt",
        images: ["/images/featured-2.jpeg"],
        price: 790,
        size: "S",
        type: "clothe",
        newIn: true,
        featured: true,
    },
];

interface ProductInfo {
    id: string;
    name: string;
    price: number;
    amount: number;
    size: string;
}

const InitialProductInfo = {
    id: DUMMY_PRODUCTS[0].id,
    name: DUMMY_PRODUCTS[0].name,
    price: DUMMY_PRODUCTS[0].price,
    amount: 1,
    size: "S",
};

const SingleProduct: React.FC = () => {
    const [productInfo, setProductInfo] =
        useState<ProductInfo>(InitialProductInfo);
    const [sizeSIsTriggered, setSizeSIsTriggered] = useState(true);
    const [sizeMIsTriggered, setSizeMIsTriggered] = useState(false);

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const carouselRef = useRef<HTMLUListElement>(null);
    const [prev, next] = useCarouselArrow(1, 0, 2, 600, carouselRef);

    const triggerSizeS: MouseEventHandler<HTMLDivElement> = (event) => {
        setSizeMIsTriggered(false);
        setSizeSIsTriggered(true);

        setProductInfo((prev) => {
            return { ...prev, size: "S" };
        });
    };
    const triggerSizeM: MouseEventHandler<HTMLDivElement> = (event) => {
        setSizeSIsTriggered(false);
        setSizeMIsTriggered(true);

        setProductInfo((prev) => {
            return { ...prev, size: "M" };
        });
    };

    const minusHandler = () => {
        if (productInfo.amount <= 1) {
            return;
        }

        setProductInfo((prev) => {
            return { ...prev, amount: prev.amount - 1 };
        });
    };

    const plusHandler = () => {
        if (productInfo.amount >= 3) {
            return;
        }

        setProductInfo((prev) => {
            return { ...prev, amount: prev.amount + 1 };
        });
    };

    const addtoCart = () => {
        if (
            cart.products
                .filter((product) => product.id === DUMMY_PRODUCTS[0].id)
                .reduce((accu, curr) => accu + curr.amount, 0) +
                productInfo.amount >
            3
        ) {
            alert("超過下單件數3件，請至購物車確認數量");
            return;
        }
        dispatch(CartActions.add(productInfo));
    };

    const directToCart: MouseEventHandler<HTMLLinkElement> = (event) => {
        if (
            cart.products
                .filter((product) => product.id === DUMMY_PRODUCTS[0].id)
                .reduce((accu, curr) => accu + curr.amount, 0) +
                productInfo.amount >
            3
        ) {
            alert("超過下單件數3件，請至購物車確認數量");
            event.preventDefault();
            return;
        }

        dispatch(CartActions.add(productInfo));
    };

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
                            {DUMMY_PRODUCTS[0].newIn && (
                                <div className={s["product-info__tag"]}>
                                    <span>新品</span>
                                </div>
                            )}
                            <div className={s["product-info__name"]}>
                                <span>{DUMMY_PRODUCTS[0].name}</span>
                            </div>
                            <div className={s["product-info__price"]}>
                                <span>{DUMMY_PRODUCTS[0].price}</span>
                            </div>
                            <div className={s["product-info__detail"]}>
                                <p>韓國製造</p>
                                <p>*實際顏色依單品照為主</p>
                                <p>*單一產品不分尺寸，最多下單件數為3件</p>
                            </div>
                        </div>
                        <div className={s["client-input"]}>
                            <div className={s["product-info__size"]}>
                                <div
                                    className={
                                        sizeSIsTriggered ? s.triggered : ""
                                    }
                                    onClick={triggerSizeS}
                                >
                                    S
                                </div>
                                <div
                                    className={
                                        sizeMIsTriggered ? s.triggered : ""
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
        </section>
    );
};

export default SingleProduct;
