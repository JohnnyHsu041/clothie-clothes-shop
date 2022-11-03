import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthActions from "../redux/auth-slice";
import { RootState } from "../redux/store";

let logoutTimer: NodeJS.Timeout;

const useAuthCheck = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const tokenExpirationDate = useSelector(
        (state: RootState) => state.auth.tokenExpirationDate
    );
    const dispatch = useDispatch();

    // checking for auto login
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData")!);

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            dispatch(
                AuthActions.login({
                    userId: storedUserData.userId,
                    token: storedUserData.token,
                    expiration: new Date(storedUserData.expiration),
                })
            );
        }
    }, [dispatch]);

    // set logout timer
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date().getTime();

            logoutTimer = setTimeout(
                dispatch.bind(null, AuthActions.logout()),
                remainingTime
            );
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpirationDate, dispatch]);
};

export default useAuthCheck;
