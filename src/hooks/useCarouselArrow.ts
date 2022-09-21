import { useCallback, useEffect } from "react";

type useArrowFunc = (
    showAtOnce: number,
    startAt: number,
    ref: React.RefObject<HTMLUListElement>
) => (() => void)[];

const useCarouselArrow: useArrowFunc = (showAtOnce, startAt, ref) => {
    let amountOfProductsAlreadyDisplayed = showAtOnce;
    let amountOfProducts: number;
    let position = startAt;
    let trans: number;

    useEffect(() => {
        ref.current!.style.transform = `translateX(-${position}px)`;

        const childrenOfCarousel = ref.current!.children;
        const coordsOfFirstChild =
            childrenOfCarousel[0]!.getBoundingClientRect();
        const coordsOfSecondChild =
            childrenOfCarousel[1]!.getBoundingClientRect();
        const widthOfProductItem = coordsOfFirstChild.width;
        const gap = coordsOfSecondChild.left - coordsOfFirstChild.right;

        trans = widthOfProductItem + gap;
        amountOfProducts = childrenOfCarousel.length;
    }, []);

    const prev = useCallback(() => {
        const style = ref.current!.style;

        if (amountOfProductsAlreadyDisplayed === showAtOnce) {
            position =
                trans * (amountOfProducts - amountOfProductsAlreadyDisplayed);
            amountOfProductsAlreadyDisplayed = amountOfProducts;

            style.transform = `translateX(-${position}px)`;
            return;
        }

        position -= trans;
        amountOfProductsAlreadyDisplayed--;
        style.transform = `translateX(-${position}px)`;
    }, []);

    const next = useCallback(() => {
        const style = ref.current!.style;

        if (amountOfProductsAlreadyDisplayed === amountOfProducts) {
            position = startAt;
            amountOfProductsAlreadyDisplayed = showAtOnce;

            style.transform = `translateX(-${position}px)`;
            return;
        }

        position += trans;
        amountOfProductsAlreadyDisplayed++;
        style.transform = `translateX(-${position}px)`;
    }, []);

    return [prev, next];
};

export default useCarouselArrow;
