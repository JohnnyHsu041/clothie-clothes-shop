import ClothingPage from "./ClothingPage";
import "../../styles/css/global.css";
import { useEffect, useState } from "react";
import { Product } from "../../components/product/ProductList";
import useHttpClient from "../../hooks/useHttpClient";

// const DUMMY_PRODUCTS = [
//     {
//         id: "p1",
//         name: "channel",
//         images: [""],
//         price: 1690,
//         size: "S",
//         type: "clothing",
//         newIn: true,
//         featured: false,
//     },
// ];

const Clothing: React.FC = () => {
    const [loadedProducts, setLoadedProduct] = useState<Product[]>([]);
    const {sendRequest} = useHttpClient();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}products/`
                );

                setLoadedProduct(responseData.products.reverse());
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getAllProducts();
    }, [sendRequest]);

    return (
        <section className="clothing-page-container">
            <ClothingPage products={loadedProducts} />
        </section>
    );
};

export default Clothing;
