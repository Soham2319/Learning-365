import React, { useState, useEffect } from "react";
import {
    Video,
    Calendar,
    Clock,
    Users,
    PlayCircle,
    MoreHorizontal,
    Bell,
    CheckCircle2,
    Loader2,
    Wifi,
} from "lucide-react";
import { toast } from "react-hot-toast";

// --- Mock Data ---
const MOCK_CLASSES = [
    // {
    //     id: 1,
    //     title: "Advanced React Hooks & Patterns",
    //     instructor: "Sarah Drasner",
    //     time: "Now",
    //     duration: "90 mins",
    //     attendees: 245,
    //     status: "live",
    //     thumbnailColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
    // },
    // {
    //     id: 2,
    //     title: "System Design Interview Prep",
    //     instructor: "Alex Xu",
    //     time: "Today, 4:00 PM",
    //     duration: "60 mins",
    //     attendees: 120,
    //     status: "upcoming",
    //     thumbnailColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
    // },
    // {
    //     id: 3,
    //     title: "Intro to Docker & Kubernetes",
    //     instructor: "Bret Fisher",
    //     time: "Tomorrow, 10:00 AM",
    //     duration: "120 mins",
    //     attendees: 85,
    //     status: "upcoming",
    //     thumbnailColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    // },
    // {
    //     id: 4,
    //     title: "Python Data Science Bootcamp",
    //     instructor: "Jose Portilla",
    //     time: "Yesterday",
    //     duration: "45 mins",
    //     attendees: 890,
    //     status: "past",
    //     thumbnailColor: "bg-gradient-to-br from-orange-400 to-red-500",
    // },
];

function OnlineClassPage() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all"); // 'all', 'live', 'upcoming', 'past'

    // Simulate API Fetch
    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 800));
                setClasses(MOCK_CLASSES);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load classes");
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    // Filter Logic
    const filteredClasses = classes.filter((cls) => {
        if (activeTab === "all") return true;
        return cls.status === activeTab;
    });

    // Actions
    const handleJoin = (title) => {
        toast.success(`Joining session: ${title}`);
        // window.open('zoom-link-here', '_blank');
    };

    const handleRegister = (id) => {
        toast.success("Reminder set! We'll notify you when it starts.");
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Loading Schedule...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Video className="w-7 h-7 text-indigo-600" />
                            Live Classes
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Join real-time interactive sessions with industry experts.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
                        {["all", "live", "upcoming", "past"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                  px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap
                  ${
                      activeTab === tab
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }
                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Content Grid --- */}
                {filteredClasses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No classes found</h3>
                        <p className="text-slate-500 mt-1">
                            Try changing the filter to see more results.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((cls) => (
                            <div
                                key={cls.id}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Thumbnail Header */}
                                <div
                                    className={`h-40 ${cls.thumbnailColor} relative p-6 flex flex-col justify-between`}
                                >
                                    {/* Status Badge */}
                                    <div className="flex justify-between items-start">
                                        {cls.status === "live" ? (
                                            <span className="flex items-center px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-sm animate-pulse">
                                                <Wifi className="w-3 h-3 mr-1.5" />
                                                Live Now
                                            </span>
                                        ) : cls.status === "upcoming" ? (
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide rounded-full border border-white/20">
                                                Upcoming
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-black/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide rounded-full">
                                                Ended
                                            </span>
                                        )}

                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Play Icon (Decorative) */}
                                    <div className="absolute right-4 bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-300">
                                        <PlayCircle className="w-16 h-16 text-white" />
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Metadata */}
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                                        <span className="flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                                            {cls.duration}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                                            {cls.attendees} Joining
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                                        {cls.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mb-6 flex items-center">
                                        by{" "}
                                        <span className="font-semibold text-slate-700 ml-1">
                                            {cls.instructor}
                                        </span>
                                    </p>

                                    {/* Footer / Actions */}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="flex items-center font-medium text-slate-700">
                                                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                                {cls.time}
                                            </span>
                                        </div>

                                        {cls.status === "live" ? (
                                            <button
                                                onClick={() => handleJoin(cls.title)}
                                                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center animate-pulse-slow"
                                            >
                                                <Video className="w-4 h-4 mr-2" />
                                                Join Live Class
                                            </button>
                                        ) : cls.status === "upcoming" ? (
                                            <button
                                                onClick={() => handleRegister(cls.id)}
                                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center justify-center"
                                            >
                                                <Bell className="w-4 h-4 mr-2" />
                                                Remind Me
                                            </button>
                                        ) : (
                                            <button className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                                                <PlayCircle className="w-4 h-4 mr-2" />
                                                Watch Recording
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OnlineClassPage;
