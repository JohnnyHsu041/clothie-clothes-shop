import { Product } from "../redux/cart-slice";

function countTheAmountOfOptions(amount: number, left: number) {
    const amountOfOption = [];
    for (let i = 1; i <= amount + left; i++) {
        amountOfOption.push(i);
    }
    return amountOfOption;
}

type UseAmountCountFunc = (
    products: Product[],
    id: string,
    size: string
) => [amount: number, options: number[]];

const useAmountCount: UseAmountCountFunc = (products, id, size) => {
    const amount = products.find(
        (product) => product.id === id && product.size === size
    )!.amount;
    const amountWithAllSizes = products
        .filter((product) => product.id === id)
        .reduce((accu, curr) => accu + curr.amount, 0);

    const maximumAmountForSingleProduct = 3;
    const left = maximumAmountForSingleProduct - amountWithAllSizes;

    const options = countTheAmountOfOptions(amount, left);

    return [amount, options];
};

export default useAmountCount;
