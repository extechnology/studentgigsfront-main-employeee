import { motion } from 'framer-motion';


export default function CourseCardLoader() {


    return (

        <>

            <motion.div
                className="bg-white rounded-4xl shadow-lg overflow-hidden transition-all animate-pulse sm:w-[70vh]"
            >
                <div className="relative">
                    <div className="absolute inset-x-0 top-0 h-20 bg-gray-200"></div>
                    <div className="h-52 bg-gray-200"></div>
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                <div className="p-7 relative">
                    <div className="absolute top-0 right-0 translate-y-[-50%] translate-x-[-20%] bg-gray-200 p-3 rounded-full border-4 border-white shadow-md"></div>

                    <div className="space-y-5">
                        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
                            ))}
                        </div>
                        <div className="h-12 bg-gray-200 rounded"></div>

                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                            <ul className="space-y-2.5">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 w-5/6 bg-gray-200 rounded"></div>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3 pb-4">
                            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                            <div className="flex flex-wrap gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-5 w-16 bg-gray-200 rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
                    </div>
                </div>
            </motion.div>


        </>


    )
}
