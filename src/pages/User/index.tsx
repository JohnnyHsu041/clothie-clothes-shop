import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/ui/Button";
import UserInfo from "./UserInfo";
import useFormValidity from "../../hooks/useFormValidity";
import AuthActions from "../../redux/auth-slice";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import s from "../../styles/css/User.module.css";
import OrderList from "./OrderList";
import { RootState } from "../../redux/store";

const User: React.FC = () => {
    const {
        sendRequest,
        isLoading,
        error,
        clearError,
        clearErrorAndDirectToHomePage,
    } = useHttpClient();
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputInfoObject, formIsValid, changeHandler] = useFormValidity(
        {
            email: {
                value: "",
                isValid: true,
            },
            oldPassword: {
                value: "",
                isValid: false,
            },
            newPassword: {
                value: "",
                isValid: false,
            },
            newPasswordCheck: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const getUserEmail = async () => {
            const userId: string = JSON.parse(
                localStorage.getItem("userData")!
            ).userId;

            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}users/${userId}`,
                    "GET",
                    null,
                    {
                        Authorization: "Bearer " + auth.token,
                    }
                );

                changeHandler("email", responseData.email, true);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getUserEmail();
    }, [sendRequest, changeHandler, auth.token]);

    const { value: email } = inputInfoObject.email!;
    const { value: enteredOldPassword } = inputInfoObject.oldPassword!;
    const { value: enteredNewPassword } = inputInfoObject.newPassword!;

    const logoutHandler = () => {
        const logoutConfirm = window.confirm("?????????????");

        if (logoutConfirm) {
            dispatch(AuthActions.logout());
            navigate("/");
        }
    };

    const modifyHandler = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}users`,
                "PATCH",
                JSON.stringify({
                    email,
                    oldPassword: enteredOldPassword,
                    updatedPassword: enteredNewPassword,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );

            alert("????????????????????????????????????");

            dispatch(AuthActions.logout());
            navigate("/");
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <section className={`page ${s["user-container"]}`}>
            {error && (
                <ErrorModal
                    error={error}
                    onClear={
                        email.length > 0
                            ? clearError
                            : clearErrorAndDirectToHomePage
                    }
                    // If the length of email is larger than 0, the email address must be fetched successfully via html request. The length equaling 0 means the fetching of email address failed and client might use a illegal method to access the user page.
                />
            )}
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <>
                    <div className={s.user}>
                        <nav className={s.catalog}>
                            <NavLink
                                to="userinfo"
                                className={(navData) =>
                                    navData.isActive
                                        ? `${s.active} ${s["catalog__user"]}`
                                        : s["catalog__user"]
                                }
                            >
                                <Button>????????????</Button>
                            </NavLink>
                            <NavLink
                                to="orderlist"
                                className={(navData) =>
                                    navData.isActive
                                        ? `${s.active} ${s["catalog__order"]}`
                                        : s["catalog__order"]
                                }
                            >
                                <Button>????????????</Button>
                            </NavLink>
                            <div
                                className={s["catalog__logout"]}
                                onClick={logoutHandler}
                            >
                                <Button>??????</Button>
                            </div>
                        </nav>
                        <div className={s["info-section"]}>
                            <Routes>
                                <Route
                                    path="userinfo"
                                    element={
                                        <UserInfo
                                            modifyHandler={modifyHandler}
                                            changeHandler={changeHandler}
                                            email={email}
                                            enteredNewPassword={
                                                enteredNewPassword
                                            }
                                            formIsValid={formIsValid}
                                        />
                                    }
                                />
                                <Route
                                    path="orderlist"
                                    element={<OrderList />}
                                />
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default User;
