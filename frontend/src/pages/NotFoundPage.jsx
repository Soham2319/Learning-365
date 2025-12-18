import React, { useState, useEffect } from "react";
import { Home, ArrowLeft, Ghost, Search } from "lucide-react";

// Main Component
export default function NotFoundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize coordinates to -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white font-sans flex items-center justify-center">
            {/* Background Gradients & Noise Texture */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Floating Animated Shapes (Background) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <FloatingShape
                    className="top-[15%] left-[10%] w-24 h-24 border border-indigo-500/30 rounded-full"
                    delay="0s"
                    mousePosition={mousePosition}
                    factor={20}
                />
                <FloatingShape
                    className="bottom-[20%] left-[15%] w-16 h-16 bg-purple-500/10 rotate-45 rounded-xl"
                    delay="2s"
                    mousePosition={mousePosition}
                    factor={30}
                />
                <FloatingShape
                    className="top-[30%] right-[20%] w-32 h-32 border border-slate-700/50 rounded-full border-dashed"
                    delay="1s"
                    mousePosition={mousePosition}
                    factor={-20}
                />
                <FloatingShape
                    className="bottom-[10%] right-[10%] w-12 h-12 bg-indigo-500/20 rounded-full"
                    delay="4s"
                    mousePosition={mousePosition}
                    factor={-15}
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">
                {/* The 404 Number with Parallax */}
                <div
                    className="relative font-black text-[12rem] md:text-[16rem] leading-none select-none"
                    style={{
                        transform: `translate(${mousePosition.x * -10}px, ${
                            mousePosition.y * -10
                        }px)`,
                        transition: "transform 0.1s ease-out",
                    }}
                >
                    {/* Layered Text for Depth */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-slate-900 absolute top-2 left-2 blur-sm transform scale-[1.02] opacity-50 select-none">
                        404
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-indigo-400 to-purple-600 relative z-10 drop-shadow-2xl">
                        404
                    </span>

                    {/* Animated Element Orbiting the 0 */}
                    <div className="absolute top-1/2 left-1/2 w-[80%] h-[20%] border border-indigo-400/30 rounded-[100%] -translate-x-1/2 -translate-y-1/2 rotate-12 animate-[spin_8s_linear_infinite]"></div>
                </div>

                {/* Message */}
                <div
                    className="space-y-6 max-w-lg mx-auto"
                    style={{
                        transform: `translate(${mousePosition.x * -5}px, ${
                            mousePosition.y * -5
                        }px)`,
                        transition: "transform 0.1s ease-out",
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight animate-fade-in-up">
                        Lost in the Void?
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed animate-fade-in-up delay-100">
                        The page you are looking for has drifted away into deep space or never
                        existed in this dimension.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-200">
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="group relative px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.7)] flex items-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:animate-shimmer"></div>
                            <Home
                                size={20}
                                className="group-hover:-translate-y-0.5 transition-transform"
                            />
                            <span>Back to Home</span>
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-3.5 bg-slate-800/50 hover:bg-slate-800 text-indigo-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
                        >
                            <ArrowLeft
                                size={20}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            <span>Go Back</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Styles for specific animations not in standard Tailwind */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
        </div>
    );
}

// Sub-component for floating shapes
function FloatingShape({ className, delay, mousePosition, factor }) {
    // We calculate a slight offset based on mouse position to give depth (parallax)
    // factor determines how much this layer moves relative to the mouse
    const translateX = mousePosition.x * factor;
    const translateY = mousePosition.y * factor;

    return (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: delay,
                transform: `translate(${translateX}px, ${translateY}px)`,
                // We use transition to smooth out the mouse movement effect
                transition: "transform 0.2s ease-out",
            }}
        />
    );
}
