import NavBar from "./NavBar";

import SideDrawer from "../ui/SideDrawer";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AuthActions from "../../redux/auth-slice";

import s from "../../styles/css/MainHeader.module.css";

const MainHeader: React.FC = () => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showSideDrawerHandler = () => {
        setShowSideDrawer(true);
        document.body.style.overflow = "hidden";
    };

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false);
        document.body.style.overflow = "auto";
    };

    const logoutHandler = () => {
        const logoutConfirm = window.confirm("確定登出？");

        if (logoutConfirm) {
            dispatch(AuthActions.logout());
            navigate("/");
        }
    };

    return (
        <header className={s["header"]}>
            {showSideDrawer && (
                <Backdrop
                    show={showSideDrawer}
                    onClick={closeSideDrawerHandler}
                />
            )}
            {showSideDrawer && (
                <SideDrawer>
                    <ul>
                        <NavLink to="clothing" onClick={closeSideDrawerHandler}>
                            <li>Shop All</li>
                        </NavLink>

                        <NavLink
                            to="clothing/new-in"
                            onClick={closeSideDrawerHandler}
                        >
                            <li>New In</li>
                        </NavLink>
                        <NavLink
                            to="clothing/accs"
                            onClick={closeSideDrawerHandler}
                        >
                            <li>Accessories</li>
                        </NavLink>
                        <NavLink to="user" onClick={closeSideDrawerHandler}>
                            <li>會員中心</li>
                        </NavLink>
                        {auth.isLoggedIn ? (
                            <li onClick={logoutHandler}>登出</li>
                        ) : (
                            <NavLink to="auth" onClick={closeSideDrawerHandler}>
                                <li>登入</li>
                            </NavLink>
                        )}
                    </ul>
                </SideDrawer>
            )}
            <NavBar showSideDrawer={showSideDrawerHandler} />
        </header>
    );
};

export default MainHeader;
