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
    X,
    Upload,
} from "lucide-react";

function ProfilePage() {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        stream: "",
        phone: "",
        location: "",
        joinDate: "",
        profileImage: "", // New state for profile image
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Load user data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    full_name: parsedUser.full_name || "Student Name",
                    email: parsedUser.email || "student@example.com",
                    stream: parsedUser.stream || "General Stream",
                    phone: parsedUser.phone || "+91 98765 43210",
                    location: parsedUser.location || "New Delhi, India",
                    joinDate: parsedUser.joinDate || "January 2025",
                    profileImage: parsedUser.profileImage || "",
                });
            } catch (e) {
                console.error("Error parsing user data", e);
            }
        } else {
            setUser({
                full_name: "Student Name",
                email: "student@example.com",
                stream: "General Stream",
                phone: "+91 98765 43210",
                location: "New Delhi, India",
                joinDate: "January 2025",
                profileImage: "",
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

    // --- Image Upload Handlers ---

    const handleImageClick = () => {
        setIsImageModalOpen(true);
        setPreviewUrl(user.profileImage || null);
        setSelectedImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            // Create a preview URL
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleSaveImage = () => {
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const updatedUser = { ...user, profileImage: base64String };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setIsImageModalOpen(false);
            };
            reader.readAsDataURL(selectedImage);
        } else if (previewUrl === null) {
            // Handle removing image
            const updatedUser = { ...user, profileImage: "" };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setIsImageModalOpen(false);
        } else {
            setIsImageModalOpen(false);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
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
                            {/* Cover Image */}
                            <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/10 opacity-20 pattern-dots"></div>
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                            </div>

                            {/* Profile Info Wrapper */}
                            <div className="px-6 sm:px-10">
                                <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 relative z-10">
                                    {/* Avatar */}
                                    <div className="relative group/avatar">
                                        <div
                                            className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center shadow-xl overflow-hidden relative cursor-pointer"
                                            onClick={handleImageClick}
                                        >
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-3xl font-bold text-slate-500 select-none">
                                                    {getInitials(user.full_name)}
                                                </span>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                                <Camera className="text-white w-8 h-8" />
                                            </div>
                                        </div>
                                        {/* Online Status */}
                                        <div
                                            className="absolute bottom-4 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"
                                            title="Online"
                                        ></div>
                                    </div>

                                    {/* Name & Details */}
                                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1 md:pb-2">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 drop-shadow-sm">
                                            {user.full_name}
                                        </h1>
                                        <p className="text-slate-600 font-medium flex items-center justify-center md:justify-start bg-slate-100/80 md:bg-transparent px-3 py-1 md:p-0 rounded-full md:rounded-none mt-2 md:mt-1">
                                            {user.stream} Student
                                        </p>
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
                                    </div>

                                    <div className="p-6 grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <ProfileField
                                                label="Full Name"
                                                value={user.full_name}
                                                icon={User}
                                            />
                                            <ProfileField
                                                label="Email Address"
                                                value={user.email}
                                                icon={Mail}
                                            />
                                        </div>
                                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <ProfileField
                                                label="Phone Number"
                                                value={!user.phone ? "00000000" : user.phone}
                                                icon={Phone}
                                            />
                                            <ProfileField
                                                label="Location"
                                                value={user.location}
                                                icon={MapPin}
                                            />
                                        </div> */}
                                    </div>
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
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- Image Upload Modal --- */}
            {isImageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-800">
                                Update Profile Photo
                            </h3>
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Preview Area */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-40 h-40 rounded-full border-4 border-slate-100 shadow-inner bg-slate-50 overflow-hidden mb-4 relative group">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                            <User className="w-16 h-16 mb-2 opacity-50" />
                                            <span className="text-xs font-medium uppercase tracking-wider">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {previewUrl && (
                                    <button
                                        onClick={handleRemoveImage}
                                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline"
                                    >
                                        Remove Current Photo
                                    </button>
                                )}
                            </div>

                            {/* Upload Action */}
                            <div className="space-y-3">
                                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">
                                            {selectedImage
                                                ? "Change Selected File"
                                                : "Upload New Photo"}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="text-xs text-center text-slate-400">
                                    Recommended: Square JPG, PNG. Max 2MB.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                className="px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveImage}
                                disabled={!selectedImage && previewUrl === user.profileImage}
                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Photo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ProfileField({ label, value, icon: Icon, helperText }) {
    return (
        <div className="space-y-1.5 w-full">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center mb-1">
                <Icon className="w-3 h-3 mr-1.5" />
                {label}
            </label>
            <div>
                <p className="text-slate-800 font-medium px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent truncate">
                    {value}
                </p>
                {helperText && (
                    <p className="text-xs text-amber-600/80 mt-1 ml-1 font-medium">{helperText}</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
