import { useEffect } from "react";

const useImageLazyLoading = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries, owner) => {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = img.dataset.src as string;

                    owner.unobserve(img);
                }
            }
        });

        const productImages = document.querySelectorAll(".product-image");
        productImages.forEach((productImage) => observer.observe(productImage));
    }, []);
};

export default useImageLazyLoading;
