import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartActions from "../../redux/cart-slice";
import s from "../../styles/css/CartProductItem.module.css";
import Button from "../../components/ui/Button";

interface CartProductItemProps {
    id: string;
    name: string;
    size: string;
    amount: number;
    total: number;
    remove: (id: string, size: string) => void;
}

function countTheAmountOfOptions(amount: number, left: number) {
    const amountOfOption = [];
    for (let i = 1; i <= amount + left; i++) {
        amountOfOption.push(i);
    }
    return amountOfOption;
}

const CartProductItem: React.FC<CartProductItemProps> = (props) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const { products } = cart;

    const amount = products.find(
        (product) => product.id === props.id && product.size === props.size
    )!.amount;
    const amountWithAllSizes = products
        .filter((product) => product.id === props.id)
        .reduce((accu, curr) => accu + curr.amount, 0);

    const maximumAmountForSingleProduct = 3;
    const left = maximumAmountForSingleProduct - amountWithAllSizes;

    const options = countTheAmountOfOptions(amount, left);

    const changeAmountHandler = () => {
        const amount = +selectRef.current!.value;

        dispatch(
            CartActions.changeAmount({ id: props.id, size: props.size, amount })
        );
    };

    const removeHandler = () => {
        dispatch(CartActions.remove({ id: props.id, size: props.size }));
        props.remove(props.id, props.size);
    };

    return (
        <li className={s.product}>
            <div className={s["product-name"]}>{props.name}</div>
            <div className={s["product-size"]}>{props.size}</div>
            <div className={s["product-amount"]}>
                <select
                    ref={selectRef}
                    onChange={changeAmountHandler}
                    defaultValue={amount}
                >
                    {options.map((option) => {
                        return <option>{option}</option>;
                    })}
                </select>
                <Button onClick={removeHandler}>
                    <span>刪除</span>
                </Button>
            </div>
            <div className={s["product-price"]}>{props.total}</div>
        </li>
    );
};

export default CartProductItem;
