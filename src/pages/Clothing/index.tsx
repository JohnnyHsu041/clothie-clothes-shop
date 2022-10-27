import ClothingPage from "./ClothingPage";
import "../../styles/css/global.css";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        name: "channel",
        images: [""],
        price: 1690,
        size: "S",
        type: "clothing",
        newIn: true,
        featured: false,
    },
];

const Clothing: React.FC = () => {
    return (
        <section className="clothing-page-container">
            <ClothingPage products={DUMMY_PRODUCTS} />
        </section>
    );
};

export default Clothing;
