import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";

interface RedirectProps {
    destination: string;
}

const Redirect: React.FC<RedirectProps> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData")!);

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            navigate(`/${props.destination}`);
        } else {
            navigate("/auth");
        }
    }, [props.destination, navigate]);

    return <LoadingSpinner />;
};

export default Redirect;
