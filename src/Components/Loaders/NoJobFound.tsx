import { useState, useEffect } from 'react';

const ModernNoJobsFound = () => {


    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);



    return (


        <div className="flex flex-col items-center justify-center w-full">


            <div className={`max-w-l w-full transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700 ease-out`}>


                <div className="bg-white rounded-2xl overflow-hidden">


                    <div className="relative bg-green-50 pt-12 pb-10 px-8">


                        {/* Top gradient bar */}
                        {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div> */}


                        {/* Animated illustration */}
                        <div className="w-48 h-48 mx-auto mb-6 relative">


                            {/* Main circle */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full animate-pulse"></div>


                            {/* Magnifying glass */}
                            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                                <g className="animate-float">
                                    {/* Handle */}
                                    <line
                                        x1="130" y1="130"
                                        x2="170" y2="170"
                                        stroke="url(#grad1)"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    />

                                    {/* Glass */}
                                    <circle
                                        cx="90" cy="90"
                                        r="55"
                                        fill="none"
                                        stroke="url(#grad1)"
                                        strokeWidth="8"
                                        className="origin-center"
                                    />

                                    {/* Reflections */}
                                    <path
                                        d="M70 60 Q 80 70, 95 72"
                                        stroke="#fff"
                                        strokeWidth="3"
                                        fill="none"
                                        opacity="0.6"
                                        className="animate-pulse"
                                    />
                                    <path
                                        d="M60 90 Q 70 85, 75 75"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        fill="none"
                                        opacity="0.4"
                                        className="animate-pulse"
                                    />
                                </g>

                                {/* Document icons */}
                                {[...Array(4)].map((_, i) => (
                                    <rect
                                        key={i}
                                        x={55 + (i * 10)}
                                        y={90 + (i * 10)}
                                        width="15"
                                        height="20"
                                        rx="2"
                                        fill="#d1fae5"
                                        opacity={0.7 - (i * 0.15)}
                                        className="origin-bottom animate-bounce"
                                    />
                                ))}

                                {/* Gradient definitions */}
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Floating particles */}
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-green-300 animate-ping"
                                    style={{
                                        width: `${4 + (i % 4)}px`,
                                        height: `${4 + (i % 4)}px`,
                                        left: `${30 + ((i * 17) % 70)}%`,
                                        top: `${20 + ((i * 13) % 60)}%`,
                                        animationDuration: `${2 + (i % 3)}s`,
                                        animationDelay: `${i * 0.3}s`,
                                        opacity: 0.3 + (i * 0.1),
                                    }}
                                />
                            ))}
                        </div>

                        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">No Jobs Found</h1>
                    </div>

                    <div className="px-8 py-6">
                        <p className="text-gray-600 text-center mb-6">
                            We couldn't find any jobs matching your criteria. Try broadening your search or check back later for new opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernNoJobsFound;