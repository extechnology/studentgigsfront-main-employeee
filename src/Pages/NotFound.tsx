import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


export default function NotFound() {

    // Scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth', });


    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Start animation when component mounts
        setIsAnimating(true);

        // Create interval for continuous animation
        const interval = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, 4000);

        return () => clearInterval(interval);
    }, []);


    return (


        <>

            <main>

                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

                    <div className="bg-orange-600 h-3 w-full"></div>

                    <div className="max-w-7xl w-full rounded-xl overflow-hidden">



                        <div className="px-8 pt-8 pb-4 text-center">
                            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
                            <h2 className="text-2xl font-semibold text-orange-600 mb-6">Page Not Found</h2>

                            {/* SVG Animation */}
                            <div className="w-full max-w-sm mx-auto my-8 relative h-64">
                                <svg
                                    viewBox="0 0 200 160"
                                    className="w-full h-full"
                                >
                                    {/* Briefcase */}
                                    <rect
                                        x="70"
                                        y="60"
                                        width="60"
                                        height="45"
                                        rx="4"
                                        fill="#f97316"
                                        className={`transform origin-center ${isAnimating ? 'translate-y-1' : '-translate-y-1'} transition-transform duration-1000 ease-in-out`}
                                    />
                                    <rect
                                        x="80"
                                        y="50"
                                        width="40"
                                        height="10"
                                        rx="2"
                                        fill="#f97316"
                                        className={`transform origin-center ${isAnimating ? 'translate-y-1' : '-translate-y-1'} transition-transform duration-1000 ease-in-out`}
                                    />

                                    {/* Document 1 */}
                                    <rect
                                        x="60"
                                        y="70"
                                        width="30"
                                        height="40"
                                        rx="2"
                                        fill="#fcd34d"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : '-translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />
                                    <line
                                        x1="65"
                                        y1="80"
                                        x2="85"
                                        y2="80"
                                        stroke="#f8fafc"
                                        strokeWidth="2"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : '-translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />
                                    <line
                                        x1="65"
                                        y1="90"
                                        x2="80"
                                        y2="90"
                                        stroke="#f8fafc"
                                        strokeWidth="2"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : '-translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />

                                    {/* Document 2 */}
                                    <rect
                                        x="110"
                                        y="70"
                                        width="30"
                                        height="40"
                                        rx="2"
                                        fill="#fcd34d"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : 'translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />
                                    <line
                                        x1="115"
                                        y1="80"
                                        x2="135"
                                        y2="80"
                                        stroke="#f8fafc"
                                        strokeWidth="2"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : 'translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />
                                    <line
                                        x1="115"
                                        y1="90"
                                        x2="130"
                                        y2="90"
                                        stroke="#f8fafc"
                                        strokeWidth="2"
                                        className={`transform origin-center ${isAnimating ? 'translate-x-0 translate-y-0' : 'translate-x-20 -translate-y-16'} transition-all duration-1000 ease-in-out`}
                                    />

                                    {/* Question Mark */}
                                    <text
                                        x="100"
                                        y="140"
                                        fontSize="30"
                                        fontWeight="bold"
                                        fill="#f97316"
                                        textAnchor="middle"
                                        className={`${isAnimating ? 'opacity-100' : 'opacity-50'} transition-opacity duration-1000 ease-in-out`}
                                    >
                                        ?
                                    </text>

                                    {/* Magnifying Glass */}
                                    <circle
                                        cx="140"
                                        cy="110"
                                        r="15"
                                        fill="none"
                                        stroke="#f97316"
                                        strokeWidth="4"
                                        className={`transform origin-center ${isAnimating ? 'scale-100' : 'scale-110'} transition-transform duration-1000 ease-in-out`}
                                    />
                                    <line
                                        x1="150"
                                        y1="120"
                                        x2="165"
                                        y2="135"
                                        stroke="#f97316"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className={`transform origin-center ${isAnimating ? 'scale-100' : 'scale-110'} transition-transform duration-1000 ease-in-out`}
                                    />
                                </svg>
                            </div>

                            <p className="text-gray-600 mb-8">
                                The job posting you're looking for seems to have vanished!
                                <br />Perhaps it was filled or moved to another location.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                                <Link to={'/'}>
                                    <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-4">
                            <div className="flex items-center justify-center">
                                <span className="text-gray-500 mr-2">Need help?</span>
                                <a href="https://wa.me/919072399100" className="text-orange-600 hover:text-orange-700 font-medium">Contact our support team</a>
                            </div>
                        </div>

                    </div>

                </div>

            </main>


        </>

    )
}
