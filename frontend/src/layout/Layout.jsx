import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="md:ml-72 min-h-screen transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
}
