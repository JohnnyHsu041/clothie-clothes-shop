import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";

const Redirect: React.FC = () => {
    const navigate = useNavigate();
    const path = window.location.pathname;

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData")!);

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            navigate(path);
        } else {
            navigate("/auth", { replace: true });
        }
    }, [navigate, path]);

    return <LoadingSpinner />;
};

export default Redirect;
