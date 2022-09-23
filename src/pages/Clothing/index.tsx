import ClothingPage from "./ClothingPage";
import "../../styles/css/global.css";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        name: "channel",
        image: "",
        price: 1690,
        "new-in": true,
        accs: false,
    },
    {
        id: "p2",
        name: "shirt",
        image: "",
        price: 790,
        "new-in": true,
        accs: false,
    },
    {
        id: "p3",
        name: "skirt",
        image: "",
        price: 990,
        "new-in": true,
        accs: false,
    },
    {
        id: "p4",
        name: "pink-channel",
        image: "",
        price: 1290,
        "new-in": true,
        accs: false,
    },
    {
        id: "p5",
        name: "milk tea",
        image: "",
        price: 890,
        "new-in": true,
        accs: false,
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
