import React, { useState, useEffect } from "react";
import {
    Clock,
    Calendar,
    FileText,
    AlertCircle,
    Search,
    ArrowRight,
    RefreshCcw,
    Loader2,
    Bot,
    History,
    Zap,
    CheckCircle2,
    XCircle,
} from "lucide-react";

function ExamPage() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExams = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock Data mimicking "Exam History"
            const mockData = [
                // {
                //     id: 1,
                //     title: "Intermediate Topics",
                //     subject: "Physics",
                //     score: "65%",
                //     status: "Failed",
                //     date: "17 Dec 2025",
                //     duration: "45 mins",
                // },
                // {
                //     id: 2,
                //     title: "Basics of Chemistry",
                //     subject: "Chemistry",
                //     score: "85%",
                //     status: "Passed",
                //     date: "15 Dec 2025",
                //     duration: "30 mins",
                // },
                // {
                //     id: 3,
                //     title: "Advanced Math",
                //     subject: "Mathematics",
                //     score: "92%",
                //     status: "Passed",
                //     date: "10 Dec 2025",
                //     duration: "60 mins",
                // },
            ];
            setExams(mockData);
        } catch (err) {
            console.error(err);
            setError("Unable to load exam history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Loading assessments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Connection Error</h3>
                    <p className="text-slate-500 mb-6">{error}</p>
                    <button
                        onClick={fetchExams}
                        className="px-6 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center mx-auto gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* --- Header Section --- */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-700">
                            <Bot className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            AI-Simulated Exam
                        </h1>
                    </div>
                    <p className="text-slate-500 text-lg ml-1">
                        Questions are generated automatically from your library content.
                    </p>
                </div>

                {/* --- Hero Card (Start Exam) --- */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-xl shadow-indigo-200">
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl font-bold mb-3">Ready for Assessment?</h2>
                        <p className="text-indigo-100 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                            Test your knowledge based on your uploaded Library resources. The AI
                            will generate a unique set of questions for you.
                        </p>
                        <button className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-bold text-lg rounded-xl hover:bg-amber-300 transition-transform active:scale-95 shadow-lg shadow-amber-500/20 w-full sm:w-auto">
                            <Zap className="w-5 h-5 mr-2 fill-slate-900" />
                            Start Exam Now
                        </button>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-indigo-900/30 rounded-full blur-2xl"></div>
                </div>

                {/* --- Exam History Section --- */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <History className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Exam History</h2>
                    </div>

                    <div className="space-y-4">
                        {exams.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                                <p className="text-slate-400">
                                    No exam history found. Start your first exam above!
                                </p>
                            </div>
                        ) : (
                            exams.map((exam) => (
                                <div
                                    key={exam.id}
                                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Score Badge */}
                                        <div
                                            className={`
                      flex flex-col items-center justify-center w-16 h-16 rounded-2xl font-bold text-white shadow-sm shrink-0
                      ${exam.status === "Passed" ? "bg-indigo-600" : "bg-rose-500"}
                    `}
                                        >
                                            <span className="text-lg">{exam.score}</span>
                                        </div>

                                        {/* Details */}
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {exam.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                                <span className="flex items-center">
                                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />{" "}
                                                    {exam.date}
                                                </span>
                                                <span className="hidden sm:flex items-center">
                                                    <Clock className="w-3.5 h-3.5 mr-1.5" />{" "}
                                                    {exam.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Bar (Mobile: Full Width, Desktop: Auto) */}
                                    <div
                                        className={`
                    w-full sm:w-auto px-6 py-2 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2
                    ${
                        exam.status === "Passed"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                    }
                  `}
                                    >
                                        {exam.status === "Passed" ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : (
                                            <XCircle className="w-4 h-4" />
                                        )}
                                        {exam.status}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamPage;
