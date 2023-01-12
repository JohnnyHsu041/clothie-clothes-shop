import { FormEvent, useEffect, useState } from "react";
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
import Modal from "../../components/ui/Modal";

const User: React.FC = () => {
    const {
        sendRequest,
        isLoading,
        error,
        clearError,
        clearErrorAndDirectToHomePage,
    } = useHttpClient();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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

    const showLogoutModalHandler = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModalHandler = () => {
        document.body.style.overflow = "auto";
        setShowLogoutModal(false);
    };

    const logoutHandler = () => {
        document.body.style.overflow = "auto";
        dispatch(AuthActions.logout());
        navigate("/");
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

            alert("密碼更新成功，請重新登入");

            dispatch(AuthActions.logout());
            navigate("/");
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <section className={`page ${s["user-container"]}`}>
            {showLogoutModal && (
                <Modal
                    show={showLogoutModal}
                    onCancel={closeLogoutModalHandler}
                    header={"是否登出？"}
                    footer={
                        <Button onClick={closeLogoutModalHandler}>取消</Button>
                    }
                >
                    <Button onClick={logoutHandler}>登出</Button>
                </Modal>
            )}
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
                                <Button>會員資料</Button>
                            </NavLink>
                            <NavLink
                                to="orderlist"
                                className={(navData) =>
                                    navData.isActive
                                        ? `${s.active} ${s["catalog__order"]}`
                                        : s["catalog__order"]
                                }
                            >
                                <Button>訂單記錄</Button>
                            </NavLink>
                            <div
                                className={s["catalog__logout"]}
                                onClick={showLogoutModalHandler}
                            >
                                <Button>登出</Button>
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
