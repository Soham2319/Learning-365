import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UserAuthenticationPage from "./pages/UserAuthenticationPage";
import Layout from "./layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route path="/auth/login" element={<UserAuthenticationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
