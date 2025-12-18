import React, { useState, useEffect } from "react";
import {
    Search,
    BookOpen,
    Filter,
    MoreVertical,
    Star,
    Clock,
    Book,
    Loader2,
    ArrowRight,
} from "lucide-react";

// --- Mock Data ---
const MOCK_BOOKS = [
    // {
    //     id: 1,
    //     title: "Introduction to Algorithms",
    //     author: "Thomas H. Cormen",
    //     category: "Computer Science",
    //     rating: 4.8,
    //     status: "Available",
    //     coverColor: "bg-emerald-100 text-emerald-600",
    // },
    // {
    //     id: 2,
    //     title: "Clean Code",
    //     author: "Robert C. Martin",
    //     category: "Software Engineering",
    //     rating: 4.9,
    //     status: "Borrowed",
    //     coverColor: "bg-blue-100 text-blue-600",
    // },
    // {
    //     id: 3,
    //     title: "Physics for Scientists",
    //     author: "Serway & Jewett",
    //     category: "Physics",
    //     rating: 4.5,
    //     status: "Available",
    //     coverColor: "bg-purple-100 text-purple-600",
    // },
    // {
    //     id: 4,
    //     title: "Organic Chemistry",
    //     author: "Paula Yurkanis Bruice",
    //     category: "Chemistry",
    //     rating: 4.6,
    //     status: "Available",
    //     coverColor: "bg-amber-100 text-amber-600",
    // },
    // {
    //     id: 5,
    //     title: "Calculus: Early Transcendentals",
    //     author: "James Stewart",
    //     category: "Mathematics",
    //     rating: 4.7,
    //     status: "Available",
    //     coverColor: "bg-rose-100 text-rose-600",
    // },
    // {
    //     id: 6,
    //     title: "Design Patterns",
    //     author: "Erich Gamma",
    //     category: "Software Engineering",
    //     rating: 4.8,
    //     status: "Borrowed",
    //     coverColor: "bg-indigo-100 text-indigo-600",
    // },
];

const CATEGORIES = [
    "All",
    "Computer Science",
    "Software Engineering",
    "Physics",
    "Chemistry",
    "Mathematics",
];

function LibraryPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Simulate Fetching Data
    useEffect(() => {
        const timer = setTimeout(() => {
            setBooks(MOCK_BOOKS);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Filter Logic
    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Loading Library...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Digital Library</h1>
                        <p className="text-slate-500 mt-1">
                            Access thousands of educational resources.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 shadow-sm">
                            Total Books:{" "}
                            <span className="text-indigo-600 font-bold ml-1">{books.length}</span>
                        </span>
                    </div>
                </div>

                {/* --- Search & Filters --- */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>

                    {/* Category Tabs (Desktop) */}
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                  whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${
                      selectedCategory === cat
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Books Grid --- */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <div
                                key={book.id}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                {/* Book Cover Placeholder */}
                                <div
                                    className={`h-40 ${book.coverColor} flex items-center justify-center relative`}
                                >
                                    <Book className="w-16 h-16 opacity-80 shadow-sm" />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span className="text-slate-700">{book.rating}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                                                {book.category}
                                            </span>
                                            {book.status === "Available" ? (
                                                <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    Borrowed
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1 group-hover:text-indigo-700 transition-colors line-clamp-2">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">{book.author}</p>
                                    </div>

                                    {/* Action */}
                                    <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-2 group/btn">
                                        View Details
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* --- Empty State --- */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No books found</h3>
                        <p className="text-slate-500 max-w-sm mt-1">
                            We couldn't find any books matching "{searchQuery}" in the selected
                            category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                            className="mt-6 text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LibraryPage;
