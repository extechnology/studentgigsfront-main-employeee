import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobApplicationSuccess() {

    return (
        <div className="min-h-screen    w-full bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
            {/* Animated background SVG elements */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Top left circle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 1 }}
                    className="absolute top-10 left-10"
                >
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="60" fill="#6366F1" fillOpacity="0.1" />
                    </svg>
                </motion.div>

                {/* Bottom right pattern */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-10 right-10"
                >
                    <svg width="160" height="160" viewBox="0 0 160 160">
                        <rect x="0" y="0" width="160" height="160" fill="#A855F7" fillOpacity="0.1" rx="30" />
                    </svg>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        transition: {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse" as const,
                            ease: "easeInOut"
                        }
                    }}
                    className="absolute top-1/4 right-1/4"
                >
                    <svg width="40" height="40" viewBox="0 0 40 40">
                        <path
                            d="M20 0L40 30H0L20 0Z"
                            fill="#6366F1"
                            fillOpacity="0.2"
                        />
                    </svg>
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        transition: {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse" as const,
                            ease: "easeInOut",
                            delay: 1
                        }
                    }}
                    className="absolute bottom-1/3 left-1/4"
                >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="15" fill="#EC4899" fillOpacity="0.2" />
                    </svg>
                </motion.div>
            </div>

            {/* Main content card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-xl text-center z-10 relative backdrop-blur-sm bg-white/95"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
                        Application Submitted!
                    </h1>
                    <p className="text-gray-600 text-base md:text-md">
                        Your application has been successfully submitted. We'll notify you if you're shortlisted.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100"
                >
                    <div className="flex items-center">

                        <p className="text-blue-700 text-sm">
                            We're reviewing your application and will contact you soon.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="mt-8 space-y-4"
                >
                    <Link to="/" className="block">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300">
                                Go to Home
                            </Button>
                        </motion.div>
                    </Link>

                    <Link to="/jobfilter" className="block">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-all duration-300"
                            >
                                Browse More Jobs
                                <motion.div
                                    animate={{
                                        x: [0, 4, 0],
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "loop" as const
                                        }
                                    }}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </motion.div>
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}