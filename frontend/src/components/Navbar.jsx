import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Laptop,
    BookOpen,
    PenTool,
    UserCircle,
    LogOut,
    GraduationCap,
    Menu,
    X,
    ChevronRight,
    Book,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_API } from "../utils/constance";

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (token) {
                await fetch(`${BASE_API}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            navigate("/");
        } catch (e) {
            console.error(e.message);
            toast.error("Logout faild.");
        } finally {
            setLoading(false);
        }
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { id: "classes", label: "Online Classes", icon: Laptop, href: "/online-class" },
        { id: "library", label: "Library", icon: BookOpen, href: "/library" },
        { id: "courses", label: "Courses", icon: Book, href: "/course" },
        { id: "exam", label: "Exam", icon: PenTool, href: "/exam" },
        { id: "profile", label: "Profile", icon: UserCircle, href: "/profile" },
    ];

    const isLinkActive = (href) => {
        if (href === "/" && location.pathname === "/") return true;
        if (href !== "/" && location.pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <>
            {/* =================================================================
          MOBILE HEADER (Visible < md screens)
      ================================================================= */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-indigo-600 text-white shadow-md z-50 flex items-center justify-between px-4 transition-all duration-300">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight select-none">
                        Learning<span className="text-indigo-200">365</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-indigo-100 hover:bg-indigo-500 rounded-lg transition-colors active:scale-95 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* =================================================================
          MOBILE OVERLAY
      ================================================================= */}
            <div
                className={`
          fixed inset-0 bg-indigo-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* =================================================================
          SIDEBAR (Gradient Indigo 600 -> 700)
      ================================================================= */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-72 
          bg-gradient-to-b from-indigo-600 to-indigo-700
          border-r border-indigo-500/30 shadow-2xl md:shadow-xl
          transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
          mt-16 md:mt-0 
          h-[calc(100vh-4rem)] md:h-screen
          flex flex-col
        `}
            >
                {/* BRAND HEADER */}
                <div className="hidden md:flex flex-col items-center justify-center py-8 border-b border-indigo-500/30 shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-indigo-600 mb-3 shadow-lg transform transition-transform hover:scale-105 duration-300">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-white select-none">
                        LEARNING <span className="text-indigo-200">365</span>
                    </h2>
                    <p className="text-[10px] text-indigo-200 font-bold tracking-widest uppercase mt-1 select-none">
                        Student Portal
                    </p>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                    <p className="px-4 text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2 select-none">
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const active = isLinkActive(item.href);
                        return (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={`
                  group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                  outline-none focus-visible:ring-2 focus-visible:ring-white/50
                  ${
                      active
                          ? "bg-white text-indigo-700 font-bold shadow-lg shadow-indigo-900/20"
                          : "text-indigo-100 hover:bg-indigo-500 hover:text-white font-medium"
                  }
                `}
                            >
                                <div className="flex items-center">
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                                            active
                                                ? "text-indigo-600"
                                                : "text-indigo-300 group-hover:text-white"
                                        }`}
                                    />
                                    {item.label}
                                </div>

                                {/* Arrow Icon */}
                                {!active && (
                                    <ChevronRight className="w-4 h-4 text-indigo-300 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 hidden md:block" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* FOOTER */}
                <div className="p-4 border-t border-indigo-500/30 shrink-0 bg-indigo-800/20">
                    <button
                        onClick={handleLogout}
                        className={`flex w-full items-center justify-center px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-700/50 ${
                            loading
                                ? "bg-red-700 text-indigo-300"
                                : " hover:bg-red-500  hover:border-red-500 text-indigo-100"
                        }  hover:text-white transition-all duration-200 font-semibold shadow-sm group active:scale-[0.98]`}
                    >
                        <LogOut className="w-4 h-4 mr-2 text-indigo-300 group-hover:text-white transition-colors" />
                        {loading ? "Sing Out...." : "Sing Out"}
                    </button>
                    <p className="text-center text-[10px] text-indigo-300 mt-4 font-medium select-none">
                        © 2025 Learning 365. v1.0.0
                    </p>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
