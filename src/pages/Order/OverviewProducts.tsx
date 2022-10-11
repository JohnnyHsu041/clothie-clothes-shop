import { produceWithPatches } from "immer";
import s from "../../styles/css/OverviewProducts.module.css";
import OverviewProductItem from "./OverviewProductItem";

const DUMMY_PRODUCTS_LIST = [
    {
        id: "p1",
        name: "channel",
        size: "S",
        amount: 2,
        total: 1690 * 2,
        img: "/images/featured-1.jpeg",
    },
    {
        id: "p1",
        name: "channel",
        size: "M",
        amount: 1,
        total: 1690 * 1,
        img: "/images/featured-2.jpeg",
    },
    {
        id: "p1",
        name: "channel",
        size: "S",
        amount: 2,
        total: 1690 * 2,
        img: "/images/featured-1.jpeg",
    },
    {
        id: "p1",
        name: "channel",
        size: "M",
        amount: 1,
        total: 1690 * 1,
        img: "/images/featured-2.jpeg",
    },
    {
        id: "p1",
        name: "channel",
        size: "S",
        amount: 2,
        total: 1690 * 2,
        img: "/images/featured-1.jpeg",
    },
    {
        id: "p1",
        name: "channel",
        size: "M",
        amount: 1,
        total: 1690 * 1,
        img: "/images/featured-2.jpeg",
    },
];

const OverviewProducts: React.FC = () => {
    return (
        <ul className={s.products}>
            {DUMMY_PRODUCTS_LIST.map((product) => (
                <OverviewProductItem
                    key={product.id}
                    img={product.img}
                    name={product.name}
                    size={product.size}
                    amount={product.amount}
                    total={product.total}
                />
            ))}
        </ul>
    );
};

export default OverviewProducts;