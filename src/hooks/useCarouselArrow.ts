import { useCallback } from "react";

type useArrowFunc = (
    showAtOnce: number,
    startAt: number,
    amountOfProducts: number,
    trans: number,
    ref: React.RefObject<HTMLUListElement>
) => (() => void)[];

const useCarouselArrow: useArrowFunc = (
    showAtOnce,
    startAt,
    amountOfProducts,
    trans,
    ref
) => {
    let amountOfProductsAlreadyDisplayed = showAtOnce;
    let position = startAt;

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
    }, [amountOfProducts, trans, showAtOnce]);

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
    }, [amountOfProducts, trans, showAtOnce]);

    return [prev, next];
};

export default useCarouselArrow;
