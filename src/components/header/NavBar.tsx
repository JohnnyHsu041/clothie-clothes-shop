import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import s from "../../styles/css/NavBar.module.css";
import Button from "../ui/Button";

interface NavBarProps {
    showSideDrawer: () => void;
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const cart = useSelector((state: RootState) => state.cart);
    const productAmountInCart = cart.amountOfCartProducts;

    return (
        <div className={s["nav-bar"]}>
            <div className={s.logo}>
                <NavLink to="/">clothie</NavLink>
            </div>
            <nav className={s["main-nav"]}>
                <div>
                    <NavLink
                        to="clothing"
                        className={(navData) =>
                            navData.isActive ? s.active : ""
                        }
                    >
                        Shop All
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="new-in"
                        className={(navData) =>
                            navData.isActive ? s.active : ""
                        }
                    >
                        New In
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="accs"
                        className={(navData) =>
                            navData.isActive ? s.active : ""
                        }
                    >
                        Accessories
                    </NavLink>
                </div>
            </nav>
            <nav className={s["user-nav"]}>
                <Button type="link" dest="/cart">
                    <div className={s["user-nav__cart"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                        {cart.amountOfCartProducts > 0 && (
                            <div className={s["product-amount-in-cart"]}>
                                <p>{productAmountInCart}</p>
                            </div>
                        )}
                    </div>
                </Button>
                <Button type="link" dest="/user">
                    <div className={s["user-nav__avatar"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                    </div>
                </Button>
                <div className={s["menu-button"]}>
                    <Button onClick={props.showSideDrawer}>選單</Button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
