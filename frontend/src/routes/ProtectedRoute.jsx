import { Navigate, useLocation } from "react-router-dom";

async function ProtectedRoute({ children }) {
    const location = useLocation();

    const user = await JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
