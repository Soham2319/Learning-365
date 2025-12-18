import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Laptop,
    BookOpen,
    PenTool,
    UserCircle,
    LogOut,
    GraduationCap,
    Bell,
    Rocket,
    Menu,
    X,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState({ fullName: "Learner", email: "" });

    // Load user data from localStorage on mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Adapt to whatever key your API returns (full_name vs fullName)
                setUser({
                    fullName: parsedUser.fullName || parsedUser.full_name || "Learner",
                    email: parsedUser.email || "",
                });
            }
        } catch (error) {
            console.error("Failed to parse user data", error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Helper to get first name
    const getFirstName = (fullName) => {
        return fullName.split(" ")[0];
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
            {/* --- Mobile Overlay --- */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <Navbar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-slate-200 flex items-center justify-between p-4 sticky top-0 z-10">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-3">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-slate-900">Learning 365</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
                                    Welcome back,{" "}
                                    <span className="text-blue-200">
                                        {getFirstName(user.fullName)}
                                    </span>
                                    !
                                </h1>
                                <p className="text-blue-100 text-lg max-w-xl">
                                    Continue your learning journey and check your progress.
                                </p>
                            </div>
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Notifications Section */}
                            <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                        <Bell className="w-5 h-5 mr-2 text-blue-600" />
                                        Latest Notifications
                                    </h2>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                        3 New
                                    </span>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    <NotificationItem
                                        title="New online class added: Python"
                                        time="14/12/2025, 13:00:30"
                                        isNew
                                    />
                                    <NotificationItem
                                        title="New library resource added: Python"
                                        time="14/12/2025, 12:57:54"
                                    />
                                    <NotificationItem
                                        title="New library resource added: Masir"
                                        time="14/12/2025, 10:31:52"
                                    />
                                </div>
                            </section>

                            {/* Continue Learning Section */}
                            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                                <div className="p-6 border-b border-slate-100">
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                        <Rocket className="w-5 h-5 mr-2 text-indigo-600" />
                                        Continue Learning
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4 flex-1 bg-slate-50/50">
                                    <CourseCard
                                        title="Web Development Fundamentals"
                                        progress={75}
                                        color="bg-orange-500"
                                    />
                                    <CourseCard
                                        title="Data Science Basics"
                                        progress={30}
                                        color="bg-emerald-500"
                                    />
                                    <div className="pt-2">
                                        <button className="w-full py-3 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 border-dashed">
                                            + Browse More Courses
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active }) {
    return (
        <a
            href="#"
            className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                active
                    ? "bg-blue-50 text-blue-700 font-bold shadow-sm ring-1 ring-blue-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
            }`}
        >
            <Icon
                className={`w-5 h-5 mr-3 transition-colors ${
                    active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
            />
            {label}
        </a>
    );
}

function NotificationItem({ title, time, isNew }) {
    const highlightKeywords = (text) => {
        const parts = text.split(/(:)/);
        return parts.map((part, index) => {
            if (index === 2)
                return (
                    <span key={index} className="font-bold text-slate-900">
                        {part}
                    </span>
                );
            return part;
        });
    };

    return (
        <div
            className={`p-5 hover:bg-slate-50 transition-colors flex items-start ${
                isNew ? "bg-blue-50/30" : ""
            }`}
        >
            <div
                className={`w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0 ${
                    isNew ? "bg-blue-500" : "bg-slate-300"
                }`}
            ></div>
            <div>
                <p className="text-sm text-slate-700 leading-relaxed">{highlightKeywords(title)}</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">{time}</p>
            </div>
        </div>
    );
}

function CourseCard({ title, progress, color }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white shadow-lg shadow-opacity-20`}
                >
                    <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md group-hover:bg-slate-200 transition-colors">
                    Resume
                </span>
            </div>
            <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                <div
                    className={`${color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-xs text-slate-500 text-right font-medium">{progress}% Complete</p>
        </div>
    );
}

export default Dashboard;
