import Hero from "./Hero";
import Featured from "./Featured";
import Cta from "./Cta";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <div className="page">
            <Hero />
            <Featured />
            {!isLoggedIn && <Cta />}
        </div>
    );
};

export default Home;
