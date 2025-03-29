import { motion } from 'framer-motion';

export default function AnimatedSvg() {


    return (

        <>
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-blue-400"
                    animate={{
                        x: [0, 40, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-pink-400"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full filter blur-3xl opacity-10 bg-purple-400"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Animated pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                            <circle cx="25" cy="25" r="1" fill="#6366F1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

        </>

    )


}
