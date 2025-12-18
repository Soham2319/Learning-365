import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
