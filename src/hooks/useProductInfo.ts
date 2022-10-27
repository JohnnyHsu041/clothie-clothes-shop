import { useState, MouseEventHandler, useCallback } from "react";

interface ProductInfo {
    _id: string;
    name: string;
    price: number;
    amount: number;
    size: string;
    newIn: boolean;
    images: string[];
}

const InitialProductInfo = {
    _id: "id",
    name: "name",
    price: 0,
    amount: 1,
    size: "S",
    newIn: false,
    images: [""],
};

const useProductInfo = () => {
    const [productInfo, setProductInfo] =
        useState<ProductInfo>(InitialProductInfo);
    const [sizeSIsTriggered, setSizeSIsTriggered] = useState(true);
    const [sizeMIsTriggered, setSizeMIsTriggered] = useState(false);

    const triggerSizeS: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            setSizeMIsTriggered(false);
            setSizeSIsTriggered(true);

            setProductInfo((prev) => {
                return { ...prev, size: "S" };
            });
        },
        []
    );

    const triggerSizeM: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            setSizeSIsTriggered(false);
            setSizeMIsTriggered(true);

            setProductInfo((prev) => {
                return { ...prev, size: "M" };
            });
        },
        []
    );

    const minusHandler = useCallback(() => {
        if (productInfo.amount <= 1) {
            return;
        }

        setProductInfo((prev) => {
            return { ...prev, amount: prev.amount - 1 };
        });
    }, [productInfo]);

    const plusHandler = useCallback(() => {
        if (productInfo.amount >= 3) {
            return;
        }

        setProductInfo((prev) => {
            return { ...prev, amount: prev.amount + 1 };
        });
    }, [productInfo]);

    return {
        triggerSizeS,
        triggerSizeM,
        sizeMIsTriggered,
        sizeSIsTriggered,
        plusHandler,
        minusHandler,
        productInfo,
        setProductInfo,
    };
};

export default useProductInfo;
