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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        console.log("Logging out...");
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { id: "classes", label: "Online Classes", icon: Laptop, href: "#", action: true },
        { id: "library", label: "Library", icon: BookOpen, href: "#", action: true },
        { id: "exam", label: "Exam", icon: PenTool, href: "#", action: true },
        { id: "profile", label: "Profile", icon: UserCircle, href: "/profile" },
    ];

    const isLinkActive = (href) => {
        if (href === "/" && location.pathname === "/") return true;
        if (href !== "/" && location.pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-50 transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-lg text-slate-800 tracking-tight select-none">
                        Learning<span className="text-blue-600">365</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            <div
                className={`
                        fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300
                        ${
                            isSidebarOpen
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        }
                        `}
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
            />

            <aside
                className={`
                        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-2xl md:shadow-none
                        transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0 
                        mt-16 md:mt-0 
                        h-[calc(100vh-4rem)] md:h-screen
                        flex flex-col
                `}
            >
                {/* BRAND HEADER (Desktop Only) */}
                <div className="hidden md:flex flex-col items-center justify-center py-8 border-b border-slate-100 shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white mb-3 shadow-lg shadow-blue-500/30 transform transition-transform hover:scale-105 duration-300">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 select-none">
                        LEARNING <span className="text-blue-600">365</span>
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1 select-none">
                        Student Portal
                    </p>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 select-none">
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const active = isLinkActive(item.href);
                        return (
                            <Link
                                onClick={() => {
                                    if (item.action) {
                                        toast.error(
                                            "This site is under development. Only the Dashboard and Profile pages are accessible."
                                        );
                                    }
                                }}
                                key={item.id}
                                to={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`
                                        group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                                        outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20
                                        ${
                                            active
                                                ? "bg-blue-50 text-blue-700 font-bold shadow-sm"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                        }
                                `}
                            >
                                <div className="flex items-center">
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                                            active
                                                ? "text-blue-600"
                                                : "text-slate-400 group-hover:text-slate-600"
                                        }`}
                                    />
                                    {item.label}
                                </div>

                                {/* Active Indicator Bar */}
                                {active && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                                )}

                                {/* Desktop Hover Arrow */}
                                {!active && (
                                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 hidden md:block" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* FOOTER & LOGOUT */}
                <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 font-semibold shadow-sm group active:scale-[0.98]"
                    >
                        <LogOut className="w-4 h-4 mr-2 text-slate-400 group-hover:text-red-500 transition-colors" />
                        Sign Out
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-4 font-medium select-none">
                        © 2025 Learning 365. v1.0.0
                    </p>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
