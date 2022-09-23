import ProductList, { Product } from "../../components/product/ProductList";

interface ClothingPageProps {
    products: Product[];
}

const ClothingPage: React.FC<ClothingPageProps> = (props) => {
    return (
        <div className="page">
            <ProductList products={props.products} className="product-list" />
        </div>
    );
};

export default ClothingPage;
