import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UserAuthenticationPage from "./pages/UserAuthenticationPage";
import Layout from "./layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage";
import ExamPage from "./pages/ExamPage";
import LibraryPage from "./pages/LibraryPage";
import CoursePage from "./pages/CoursePage";
import OnlineClassPage from "./pages/OnlineClassPage";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />

            <Routes>
                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="exam" element={<ExamPage />} />
                    <Route path="library" element={<LibraryPage />} />
                    <Route path="course" element={<CoursePage />} />
                    <Route path="online-class" element={<OnlineClassPage />} />
                </Route>

                <Route path="/auth/login" element={<UserAuthenticationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
