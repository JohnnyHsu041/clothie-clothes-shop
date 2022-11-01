import { useState, useEffect } from "react";

import { Product } from "../../../components/product/ProductList";
import ErrorModal from "../../../components/ui/ErrorModal";
import useHttpClient from "../../../hooks/useHttpClient";

import ClothingPage from "../ClothingPage";

const Accessories: React.FC = () => {
    const [loadedAccessories, setLoadedAccessories] = useState<Product[]>([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}products/accs`
                );

                setLoadedAccessories(responseData.products);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getAllProducts();
    }, [sendRequest]);

    return (
        <section className="clothing-page-container">
            {error && <ErrorModal error={error} onClear={clearError} />}
            <ClothingPage products={loadedAccessories} />
        </section>
    );
};

export default Accessories;
