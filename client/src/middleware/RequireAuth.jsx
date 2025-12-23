import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!isAuthenticated && !token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default RequireAuth;
