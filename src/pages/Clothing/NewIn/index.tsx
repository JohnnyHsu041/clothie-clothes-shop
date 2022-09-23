import "../../../styles/css/global.css";
import ClothingPage from "../ClothingPage";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        name: "channel",
        image: "/images/featured-1.jpeg",
        price: 1690,
        "new-in": true,
        accs: false,
    },
    {
        id: "p2",
        name: "shirt",
        image: "/images/featured-2.jpeg",
        price: 790,
        "new-in": true,
        accs: false,
    },
    {
        id: "p3",
        name: "skirt",
        image: "/images/featured-3.jpeg",
        price: 990,
        "new-in": true,
        accs: false,
    },
    {
        id: "p4",
        name: "pink-channel",
        image: "/images/featured-4.jpeg",
        price: 1290,
        "new-in": true,
        accs: false,
    },
    {
        id: "p5",
        name: "milk tea",
        image: "/images/featured-5.jpeg",
        price: 890,
        "new-in": true,
        accs: false,
    },
];

const NewIn: React.FC = () => {
    return (
        <section className="clothing-page-container">
            <ClothingPage products={DUMMY_PRODUCTS} />
        </section>
    );
};

export default NewIn;
