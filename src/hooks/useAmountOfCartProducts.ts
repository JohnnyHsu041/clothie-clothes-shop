import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartActions from "../redux/cart-slice";

const useAmountOfCartProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CartActions.init());
    }, [dispatch]);
};

export default useAmountOfCartProducts;
