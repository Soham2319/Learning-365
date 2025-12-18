import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    GraduationCap,
    Phone,
    MapPin,
    Camera,
    Save,
    Shield,
    Clock,
    PenLine,
} from "lucide-react";

function ProfilePage() {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        stream: "",
        phone: "",
        location: "",
        joinDate: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load user data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    fullName: parsedUser.fullName || parsedUser.full_name || "Student Name",
                    email: parsedUser.email || "student@example.com",
                    stream: parsedUser.stream || "General Stream",
                    phone: parsedUser.phone || "+91 98765 43210",
                    location: parsedUser.location || "New Delhi, India",
                    joinDate: parsedUser.joinDate || "January 2025",
                });
            } catch (e) {
                console.error("Error parsing user data", e);
            }
        } else {
            // Fallback if no user in localstorage (for dev purposes)
            setUser({
                fullName: "Student Name",
                email: "student@example.com",
                stream: "General Stream",
                phone: "+91 98765 43210",
                location: "New Delhi, India",
                joinDate: "January 2025",
            });
        }
        setIsLoading(false);
    }, []);

    const getInitials = (name) => {
        if (!name) return "S";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Save changes to LocalStorage
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        setIsEditing(false);
        // Ideally, you would also make an API call here to update the backend
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- Profile Header / Cover Section --- */}
                        <div className="relative mb-12 bg-white rounded-3xl shadow-sm border border-slate-100 pb-6">
                            {/* Cover Image/Gradient */}
                            <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/10 opacity-20 pattern-dots"></div>
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                            </div>

                            {/* Profile Info Wrapper - Using Flexbox & Negative Margin for Perfect Alignment */}
                            <div className="px-6 sm:px-10">
                                <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 relative z-10">
                                    {/* Avatar */}
                                    <div className="relative group/avatar">
                                        <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center shadow-xl overflow-hidden relative">
                                            <span className="text-3xl font-bold text-slate-500 select-none">
                                                {getInitials(user.fullName)}
                                            </span>
                                            {/* Hover Effect for upload */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                                                <Camera className="text-white w-8 h-8" />
                                            </div>
                                        </div>
                                        {/* Online Status */}
                                        <div
                                            className="absolute bottom-4 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"
                                            title="Online"
                                        ></div>
                                    </div>

                                    {/* Name & Details - Perfectly Aligned */}
                                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1 md:pb-2">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 drop-shadow-sm">
                                            {user.fullName}
                                        </h1>
                                        <p className="text-slate-600 font-medium flex items-center justify-center md:justify-start bg-slate-100/80 md:bg-transparent px-3 py-1 md:p-0 rounded-full md:rounded-none mt-2 md:mt-1">
                                            {user.stream} Student
                                        </p>
                                    </div>

                                    {/* Edit Button */}
                                    <div className="mt-6 md:mt-0 md:mb-2">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`px-5 py-2.5 font-semibold rounded-xl shadow-sm transition-all flex items-center ${
                                                isEditing
                                                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 ring-1 ring-slate-200"
                                            }`}
                                        >
                                            {isEditing ? (
                                                <>Cancel Editing</>
                                            ) : (
                                                <>
                                                    <PenLine className="w-4 h-4 mr-2" /> Edit
                                                    Profile
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Content Grid --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {/* Left Column: Personal Info Form */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Personal Information Card */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                        <h3 className="font-bold text-lg text-slate-800 flex items-center">
                                            <User className="w-5 h-5 mr-2 text-blue-600" />
                                            Personal Information
                                        </h3>
                                        {isEditing && (
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 animate-pulse">
                                                Editing Enabled
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <ProfileField
                                                label="Full Name"
                                                name="fullName"
                                                value={user.fullName}
                                                onChange={handleInputChange}
                                                icon={User}
                                                editable={isEditing}
                                            />
                                            <ProfileField
                                                label="Email Address"
                                                name="email"
                                                value={user.email}
                                                onChange={handleInputChange}
                                                icon={Mail}
                                                editable={false}
                                                helperText="Contact admin to change email"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <ProfileField
                                                label="Phone Number"
                                                name="phone"
                                                value={!user.phone ? "00000000" : user.phone}
                                                onChange={handleInputChange}
                                                icon={Phone}
                                                editable={isEditing}
                                            />
                                            <ProfileField
                                                label="Location"
                                                name="location"
                                                value={user.location}
                                                onChange={handleInputChange}
                                                icon={MapPin}
                                                editable={isEditing}
                                            />
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center transform active:scale-95"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Academic Details Card */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                                        <h3 className="font-bold text-lg text-slate-800 flex items-center">
                                            <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                                            Academic Details
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 mb-6">
                                            <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600 mr-4 ring-1 ring-blue-100">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">
                                                    Current Stream
                                                </p>
                                                <p className="text-lg font-bold text-slate-800">
                                                    {user.stream}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors bg-white">
                                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                                                    Student ID
                                                </p>
                                                <p className="font-semibold text-slate-700 font-mono tracking-wide">
                                                    STU-2025-8842
                                                </p>
                                            </div>
                                            <div className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors bg-white">
                                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                                                    Academic Year
                                                </p>
                                                <p className="font-semibold text-slate-700">
                                                    2024 - 2025
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar Widgets */}
                            <div className="space-y-6">
                                {/* Account Stats Widget */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                    <h3 className="font-bold text-slate-800 mb-5 text-sm uppercase tracking-wider text-opacity-80">
                                        Account Status
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                                                    <Clock className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">
                                                    Joined
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">
                                                {user.joinDate}
                                            </span>
                                        </div>
                                        <div className="w-full border-t border-slate-100"></div>
                                        <div className="flex items-center justify-between group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                                                    <Shield className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">
                                                    Account Type
                                                </span>
                                            </div>
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                                                Active Student
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile-only Edit Button (Backup) */}
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="w-full sm:hidden py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center"
                                >
                                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                                </button>

                                {/* Promotional / Tip Widget */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-bold mb-2 flex items-center">
                                            <span className="mr-2">💡</span> Pro Tip
                                        </h3>
                                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                            Complete your profile details to receive personalized
                                            course recommendations based on your stream.
                                        </p>
                                        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                                            View Recommendations
                                        </button>
                                    </div>
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper Component for Form Fields
function ProfileField({ label, name, value, onChange, icon: Icon, editable, helperText }) {
    return (
        <div className="space-y-1.5 w-full">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center mb-1">
                <Icon className="w-3 h-3 mr-1.5" />
                {label}
            </label>
            {editable ? (
                <div className="relative">
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    />
                    {helperText && <p className="text-xs text-slate-400 mt-1 ml-1">{helperText}</p>}
                </div>
            ) : (
                <div>
                    <p className="text-slate-800 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent truncate">
                        {value}
                    </p>
                    {helperText && (
                        <p className="text-xs text-amber-600/80 mt-1 ml-1 font-medium">
                            {helperText}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
