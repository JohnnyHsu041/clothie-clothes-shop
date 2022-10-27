import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import NewIn from "./pages/Clothing/NewIn";
import Clothing from "./pages/Clothing";
import Accessories from "./pages/Clothing/Accessories";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Auth from "./pages/Auth";
import MainHeader from "./components/header/MainHeader";
import WarningBar from "./components/ui/WarningBar";
import Footer from "./components/footer/Footer";
import SingleProduct from "./pages/Clothing/SingleProduct";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Order from "./pages/Order";

function App() {
    const auth = useSelector((state: RootState) => state.auth);

    let routes: JSX.Element = auth.isLoggedIn ? (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothing/" element={<Clothing />} />
            <Route path="/clothing/:pid" element={<SingleProduct />} />
            <Route path="/clothing/new-in" element={<NewIn />} />
            <Route path="/clothing/accs" element={<Accessories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/:oid" element={<Order />} />
            <Route path="/user" element={<User />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    ) : (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothing/" element={<Clothing />} />
            <Route path="/clothing/:pid" element={<SingleProduct />} />
            <Route path="/clothing/new-in" element={<NewIn />} />
            <Route path="/clothing/accs" element={<Accessories />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/order/:oid" element={<Order />} />
            <Route path="/*" element={<Navigate to="/auth" />} />
        </Routes>
    );

    return (
        <>
            {/* <WarningBar /> */}
            <MainHeader />
            <main>{routes}</main>
            <Footer />
        </>
    );
}

export default App;
