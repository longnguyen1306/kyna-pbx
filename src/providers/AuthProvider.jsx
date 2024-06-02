import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const location = useLocation();

    if (isLoading) return <>Loading...</>;

    if (user) return <>{children}</>;

    return (
        <Navigate
            to={"/login"}
            state={{
                from: location.pathname
            }}
        />
    );
};

export default AuthProvider;
