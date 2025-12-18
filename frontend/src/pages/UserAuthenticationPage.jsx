import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ArrowRight,
    BookOpen,
    GraduationCap,
    CheckCircle,
    AlertCircle,
    Check,
} from "lucide-react";
import { BASE_API } from "../utils/constance";

function UserAuthenticationPage() {
    // State to toggle between Login and Register views
    const [isLoginView, setIsLoginView] = useState(true);

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        stream: "",
    });

    // UI Status States
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear errors when user types
        if (statusMessage.text) setStatusMessage({ type: "", text: "" });
    };

    const validateForm = () => {
        if (isLoginView) {
            if (!formData.email || !formData.password) {
                setStatusMessage({ type: "error", text: "All fields are required." });
                return false;
            }
        } else {
            if (
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword ||
                !formData.fullName ||
                !formData.stream
            ) {
                setStatusMessage({ type: "error", text: "All fields are required." });
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setStatusMessage({ type: "error", text: "Passwords do not match!" });
                return false;
            }
        }
        return true;
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_API}/public/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Please check your credentials.");
            }

            setStatusMessage({ type: "success", text: "Login Successful! Redirecting..." });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            setStatusMessage({ type: "error", text: error.message || "Something went wrong." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`${BASE_API}/public/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    stream: formData.stream,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed. Try again.");
            }

            setStatusMessage({ type: "success", text: "Registration Successful! Please Login." });
            setFormData({ ...formData, password: "", confirmPassword: "" });

            setTimeout(() => {
                setIsLoginView(true);
                setStatusMessage({ type: "", text: "" });
            }, 2000);
        } catch (error) {
            setStatusMessage({ type: "error", text: error.message || "Something went wrong." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        if (isLoginView) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div className="relative min-h-screen w-full font-sans text-slate-800 flex items-center justify-center p-4">
            {/* --- Background Image & Overlay --- */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://res.cloudinary.com/dzunlgq2p/image/upload/v1766036117/login_k2sizq.png")',
                }}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[3px]"></div>
            </div>

            {/* --- Main Card --- */}
            <main className="relative z-10 w-full max-w-112.5 animate-in fade-in zoom-in duration-300">
                <section
                    className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                    aria-labelledby="auth-heading"
                >
                    {/* Logo / Brand Header */}
                    <div className="pt-8 pb-4 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white mb-4 shadow-lg shadow-blue-500/30 ring-4 ring-blue-50">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-white">
                            Learning 365
                        </h2>
                        <p className="text-white text-sm mt-1 font-medium">
                            {isLoginView ? "Welcome back, Student!" : "Start your journey today"}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="px-8 pb-8 pt-2">
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* --- Status Message Display --- */}
                            {statusMessage.text && (
                                <div
                                    className={`flex items-center p-3 rounded-lg text-sm font-medium animate-in slide-in-from-top-2 duration-200 ${
                                        statusMessage.type === "error"
                                            ? "bg-red-500/20 text-red-100 border border-red-500/30"
                                            : "bg-green-500/20 text-green-100 border border-green-500/30"
                                    }`}
                                >
                                    {statusMessage.type === "error" ? (
                                        <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                                    ) : (
                                        <Check className="w-4 h-4 mr-2 shrink-0" />
                                    )}
                                    {statusMessage.text}
                                </div>
                            )}

                            {/* Registration Specific Fields */}
                            {!isLoginView && (
                                <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
                                    {/* Full Name */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="fullName"
                                            className="block text-xs font-bold text-gray-50 uppercase tracking-wider ml-1"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your name"
                                                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Stream Selection */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="stream"
                                            className="block text-xs font-bold text-gray-50 uppercase tracking-wider ml-1"
                                        >
                                            Stream
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <select
                                                name="stream"
                                                id="stream"
                                                value={formData.stream}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-400 text-sm font-medium appearance-none"
                                            >
                                                <option value="" disabled>
                                                    Select your stream
                                                </option>
                                                <option value="BCA">BCA</option>
                                                <option value="B.TECH">B.TECH</option>
                                                <option value="MCA">MCA</option>
                                                <option value="MBA">MBA</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {/* Custom Arrow for Select */}
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-50">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Field (Shared) */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold text-gray-50 uppercase tracking-wider ml-1"
                                >
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="student@example.edu"
                                        autoComplete="username"
                                        className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password Field (Shared) */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-baseline ml-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-bold text-gray-50 uppercase tracking-wider"
                                    >
                                        Password
                                    </label>
                                    {isLoginView && (
                                        <a
                                            href="#"
                                            className="text-xs font-bold text-blue-600 hover:text-blue-500 hover:underline"
                                        >
                                            Forgot Password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        autoComplete={
                                            isLoginView ? "current-password" : "new-password"
                                        }
                                        className="w-full pl-10 pr-12 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 text-sm font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password (Register Only) */}
                            {!isLoginView && (
                                <div className="space-y-1.5 animate-in slide-in-from-left-4 duration-300 delay-75">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-xs font-bold text-gray-50 uppercase tracking-wider ml-1"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className="w-full pl-10 pr-12 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 text-sm font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full group relative flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] mt-4 ${
                                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <>
                                        {isLoginView ? "Sign In" : "Create Account"}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Toggle View */}
                            <div className="relative mt-8">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-white/40"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/70 text-slate-500">
                                        {isLoginView
                                            ? "New to Learning 365?"
                                            : "Already have an account?"}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => {
                                        setIsLoginView(!isLoginView);
                                        setStatusMessage({ type: "", text: "" });
                                        setFormData({
                                            email: "",
                                            password: "",
                                            fullName: "",
                                            stream: "",
                                            confirmPassword: "",
                                        });
                                    }}
                                    className="font-bold text-blue-800 hover:text-blue-700 transition-colors hover:underline text-sm disabled:opacity-50"
                                >
                                    {isLoginView ? "Create an account" : "Sign in here"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Footer Text */}
                <p className="text-center text-white/80 text-xs mt-6 font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} Learning 365. All rights reserved.
                </p>
            </main>
        </div>
    );
}

export default UserAuthenticationPage;
