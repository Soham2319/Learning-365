import React, { useState, useEffect } from "react";
import { Rocket, Bell, BookOpen, User, Clock, Trash2, CheckCircle, X, Star } from "lucide-react";

// --- Mock Data ---
const NEW_COURSES = [
    {
        id: 1,
        title: "Advanced React Patterns",
        instructor: "Sarah Drasner",
        duration: "6h 30m",
        rating: 4.8,
        category: "Development",
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Gary Simon",
        duration: "12h 15m",
        rating: 4.9,
        category: "Design",
        color: "bg-purple-100 text-purple-600",
    },
    {
        id: 3,
        title: "Python for Data Science",
        instructor: "Jose Portilla",
        duration: "24h 00m",
        rating: 4.7,
        category: "Data Science",
        color: "bg-emerald-100 text-emerald-600",
    },
];

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        text: "Your 'React Native' class starts in 30 mins.",
        time: "Just now",
        type: "alert",
    },
    { id: 2, text: "New assignment uploaded for UX Design.", time: "2 hours ago", type: "info" },
    { id: 3, text: "You completed 'Intro to JavaScript'!", time: "Yesterday", type: "success" },
];

function Dashboard() {
    const [user, setUser] = useState({ fullName: "Learner", email: "" });

    // Notification State
    const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    // Load user data
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    fullName: parsedUser.fullName || parsedUser.full_name || "Learner",
                    email: parsedUser.email || "",
                });
            }
        } catch (error) {
            console.error("Failed to parse user data", error);
        }
    }, []);

    const getFirstName = (fullName) => fullName.split(" ")[0];

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    const handleEnroll = (courseTitle) => {
        // In a real app, call API here
        alert(`Enrolled in ${courseTitle} successfully!`);
    };

    return (
        <>
            {/* Content Scroll Area */}
            {/* Added pt-20 for mobile to account for fixed navbar height if needed, or rely on Layout padding */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 md:pt-8">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                    {/* --- Welcome Banner --- */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group transition-all hover:shadow-blue-500/30">
                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 leading-tight">
                                    Welcome back,{" "}
                                    <span className="text-blue-200 block sm:inline">
                                        {getFirstName(user.fullName)}!
                                    </span>
                                </h1>
                                <p className="text-blue-100 text-base sm:text-lg max-w-xl">
                                    Continue your learning journey and explore new courses today.
                                </p>
                            </div>

                            {/* Notification Button */}
                            <button
                                onClick={() => setIsNotifModalOpen(true)}
                                className="self-end sm:self-auto p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all relative border border-white/20 shadow-lg group-hover:scale-105 active:scale-95"
                                aria-label="Notifications"
                            >
                                <Bell className="w-6 h-6 text-white" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-indigo-600 rounded-full animate-pulse"></span>
                                )}
                            </button>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none"></div>
                    </div>

                    {/* --- Dashboard Grid --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* --- LATEST COURSES SECTION --- */}
                        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                                    Latest Courses
                                </h2>
                                <a
                                    href="#"
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                                >
                                    View All
                                </a>
                            </div>

                            <div className="p-5 sm:p-6 space-y-4">
                                {NEW_COURSES.map((course) => (
                                    <div
                                        key={course.id}
                                        className="group border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-200 bg-white"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* Course Info */}
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${course.color}`}
                                                >
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1 sm:line-clamp-none">
                                                        {course.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                                                        <span className="flex items-center">
                                                            <User className="w-3 h-3 mr-1" />{" "}
                                                            {course.instructor}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="w-3 h-3 mr-1" />{" "}
                                                            {course.duration}
                                                        </span>
                                                        <span className="flex items-center text-amber-500 font-medium">
                                                            <Star className="w-3 h-3 mr-1 fill-current" />{" "}
                                                            {course.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Enroll Button */}
                                            <button
                                                onClick={() => handleEnroll(course.title)}
                                                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 whitespace-nowrap"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Continue Learning Section --- */}
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-fit">
                            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center">
                                    <Rocket className="w-5 h-5 mr-2 text-indigo-600" />
                                    Continue Learning
                                </h2>
                            </div>
                            <div className="p-5 sm:p-6 space-y-4 flex-1">
                                <CourseProgressCard
                                    title="Web Development Fundamentals"
                                    progress={75}
                                    color="bg-orange-500"
                                />
                                <CourseProgressCard
                                    title="Data Science Basics"
                                    progress={30}
                                    color="bg-emerald-500"
                                />
                                <div className="pt-2">
                                    <button className="w-full py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200 border-dashed active:scale-[0.98]">
                                        + Go to My Learning
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* --- NOTIFICATION MODAL --- */}
            {isNotifModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsNotifModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-indigo-600" />
                                Notifications
                            </h3>
                            <button
                                onClick={() => setIsNotifModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className="p-5 hover:bg-slate-50 transition-colors flex gap-4"
                                        >
                                            <div
                                                className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                                                    notif.type === "alert"
                                                        ? "bg-red-500 shadow-sm shadow-red-200"
                                                        : notif.type === "success"
                                                        ? "bg-green-500 shadow-sm shadow-green-200"
                                                        : "bg-blue-500 shadow-sm shadow-blue-200"
                                                }`}
                                            />
                                            <div>
                                                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                                                    {notif.text}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1 font-medium">
                                                    {notif.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                                    <CheckCircle className="w-16 h-16 mb-4 text-slate-200" />
                                    <p className="text-sm font-medium">No new notifications</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                            <span className="text-xs font-semibold text-slate-500">
                                {notifications.length} Unread
                            </span>
                            {notifications.length > 0 && (
                                <button
                                    onClick={handleClearNotifications}
                                    className="flex items-center text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-1.5" />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Sub-component for "Continue Learning"
function CourseProgressCard({ title, progress, color }) {
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
            <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-1">
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
