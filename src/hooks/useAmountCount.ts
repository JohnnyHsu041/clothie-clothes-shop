function countTheAmountOfOptions(amount: number, left: number) {
    const amountOfOption = [];
    for (let i = 1; i <= amount + left; i++) {
        amountOfOption.push(i);
    }
    return amountOfOption;
}

type UseAmountCountFunc = (
    amountOfSpecificSize: number,
    amountWithAllSizess: number
) => [amount: number, options: number[]];

const useAmountCount: UseAmountCountFunc = (
    amountOfSpecificSize,
    amountWithAllSizes
) => {
    const maximumAmountForSingleProduct = 3;
    const left = maximumAmountForSingleProduct - amountWithAllSizes;

    const options = countTheAmountOfOptions(amountOfSpecificSize, left);

    return [amountOfSpecificSize, options];
};

export default useAmountCount;
