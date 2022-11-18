import OrderItem from "./OrderItem";

import s from "../../styles/css/OrderList.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useHttpClient from "../../hooks/useHttpClient";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorModal from "../../components/ui/ErrorModal";

export interface Order {
    id: string;
    orderId: string;
    products: {
        id: string;
        name: string;
        price: number;
        firstImage: string;
        size: {
            [key: string]: number;
        };
        amount: number;
        total: number;
    }[];
    totalAmount: number;
}

const OrderList: React.FC = () => {
    const [loadedOrders, setLoadedOrders] = useState<Order[]>([]);
    const auth = useSelector((state: RootState) => state.auth);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    useEffect(() => {
        const getOrders = async () => {
            let responseData;

            try {
                responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}orders/`,
                    "GET",
                    null,
                    { Authorization: "Bearer " + auth.token }
                );

                setLoadedOrders(responseData.orders);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getOrders();
    }, [sendRequest, auth.userId, auth.token]);

    const deleteHandler = async (id: string) => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}orders/${id}`,
                "DELETE",
                null,
                { Authorization: "Bearer " + auth.token }
            );

            setLoadedOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className={s.orderlist}>
            {isLoading && <LoadingSpinner />}
            {error && <ErrorModal error={error} onClear={clearError} />}
            <div className={s.title}>
                <div>訂單編號</div>
                <div>訂單內容</div>
                <div>金額</div>
                <div>訂單管理</div>
            </div>
            <ul className={s.order}>
                {loadedOrders.map((order: Order) => (
                    <OrderItem order={order} deleteHandler={deleteHandler} />
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
