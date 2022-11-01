import { useEffect, useState } from "react";
import useHttpClient from "../../../hooks/useHttpClient";
import "../../../styles/css/global.css";
import ClothingPage from "../ClothingPage";
import { Product } from "../../../components/product/ProductList";
import ErrorModal from "../../../components/ui/ErrorModal";

const NewIn: React.FC = () => {
    const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}products/newIn`
                );

                setLoadedProducts(responseData.products);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getAllProducts();
    }, [sendRequest]);

    return (
        <section className="clothing-page-container">
            {error && <ErrorModal error={error} onClear={clearError} />}
            <ClothingPage products={loadedProducts} />
        </section>
    );
};

export default NewIn;
