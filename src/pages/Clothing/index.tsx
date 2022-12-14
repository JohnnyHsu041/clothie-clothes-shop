import ClothingPage from "./ClothingPage";
import "../../styles/css/global.css";
import { useEffect, useState } from "react";
import { Product } from "../../components/product/ProductList";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Clothing: React.FC = () => {
    const [loadedProducts, setLoadedProduct] = useState<Product[]>([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

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
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner />}
            {!isLoading && loadedProducts && (
                <ClothingPage products={loadedProducts} />
            )}
        </section>
    );
};

export default Clothing;
