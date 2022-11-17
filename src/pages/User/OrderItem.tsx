import { v4 as uuidv4 } from "uuid";

import Button from "../../components/ui/Button";
import { Order } from "./OrderList";

import s from "../../styles/css/OrderItem.module.css";

interface OrderItemProps {
    order: Order;
    deleteHandler: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
    const products = props.order.products;
    let newProductArray = [];

    for (let product of products) {
        for (const size in product.size) {
            const key = uuidv4();

            let newProduct = {
                ...product,
                key,
                size,
                amount: product.size[size],
                total: product.price * product.size[size],
            };

            newProductArray.push(newProduct);
        }
    }

    const deleteHandler = () => {
        props.deleteHandler(props.order.id);
    };

    return (
        <li className={s["order-item"]}>
            <div>{props.order.orderId}</div>
            <div>
                <ul className={s["order-item__content"]}>
                    {newProductArray.map((product) => (
                        <li>
                            {`${product.name} 尺寸：${product.size} 數量：${product.amount}`}
                        </li>
                    ))}
                </ul>
            </div>
            <div>{props.order.totalAmount}</div>
            <Button onClick={deleteHandler}>刪除</Button>
        </li>
    );
};

export default OrderItem;
