import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Clock,
    Star,
    CheckCircle,
    Loader2,
    MoreVertical,
    Signal,
    User,
} from "lucide-react";
import { toast } from "react-hot-toast";

// --- Mock Data ---
const MOCK_COURSES = [
    {
        id: 1,
        title: "Full Stack Web Development",
        instructor: "Dr. Angela Yu",
        duration: "45 Hours",
        level: "Beginner",
        rating: 4.8,
        students: 1240,
        description:
            "Master the MERN stack (MongoDB, Express, React, Node.js) and build modern web apps.",
        tags: ["Web Dev", "React", "NodeJS"],
    },
    {
        id: 2,
        title: "Data Structures & Algorithms",
        instructor: "Abdul Bari",
        duration: "60 Hours",
        level: "Intermediate",
        rating: 4.9,
        students: 850,
        description:
            "Deep dive into DSA using Java. Master core concepts for technical interviews.",
        tags: ["DSA", "Java", "CS"],
    },
    {
        id: 3,
        title: "Machine Learning A-Z",
        instructor: "Kirill Eremenko",
        duration: "32 Hours",
        level: "Advanced",
        rating: 4.7,
        students: 2100,
        description:
            "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
        tags: ["AI", "Python", "Data Science"],
    },
    {
        id: 4,
        title: "DevOps Bootcamp",
        instructor: "Nana Janashia",
        duration: "25 Hours",
        level: "Intermediate",
        rating: 4.8,
        students: 900,
        description:
            "Learn Docker, Kubernetes, Jenkins and CI/CD pipelines to automate deployment.",
        tags: ["DevOps", "Docker", "Cloud"],
    },
];

function CoursePage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // State to track which courses the user has enrolled in
    // In a real app, this would come from the backend user profile
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch Courses (Simulation)
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setCourses(MOCK_COURSES);

                // Simulate fetching user's existing enrollments (e.g., they already have course ID 2)
                setEnrolledCourses([2]);
            } catch (error) {
                console.error("Failed to fetch courses", error);
                toast.error("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // --- CORE LOGIC: Handle Enrollment ---
    const handleEnroll = async (courseId) => {
        // 1. Check if already enrolled
        if (enrolledCourses.includes(courseId)) {
            toast("You are already enrolled in this course.", { icon: "ℹ️" });
            return;
        }

        try {
            // 2. Simulate Backend Call to add to 'enroll_curse' list
            // const response = await axios.post('/api/user/enroll', { courseId });

            // Optimistic UI Update (Simulating success)
            setEnrolledCourses((prev) => [...prev, courseId]);

            toast.success("Enrollment Successful! Course added to your library.");
        } catch (error) {
            toast.error("Enrollment failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Loading Courses...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Explore Courses</h1>
                    <p className="text-slate-500 mt-1">
                        Upgrade your skills with our premium curriculum.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => {
                        const isEnrolled = enrolledCourses.includes(course.id);

                        return (
                            <div
                                key={course.id}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                {/* Course Header/Banner */}
                                <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 p-6 flex flex-col justify-between relative">
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            {course.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-slate-500 mb-6">
                                        <div className="flex items-center">
                                            <User className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                                            {course.instructor}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center">
                                            <Signal className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                                            {course.level}
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-500" />
                                            {course.rating}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            disabled={isEnrolled}
                                            className={`
                            w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200
                            ${
                                isEnrolled
                                    ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                            }
                        `}
                                        >
                                            {isEnrolled ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Enrolled
                                                </>
                                            ) : (
                                                "Enroll Now"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
