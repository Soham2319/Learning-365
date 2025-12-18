import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user");
    const location = useLocation();

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
