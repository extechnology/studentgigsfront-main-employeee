import { Link } from "react-router-dom";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";



interface LoginModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}



export default function LoginModal({ isOpen, setIsOpen }: LoginModalProps) {


    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };


    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.2 } }
    };


    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>


            <DialogContent
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="p-0 max-w-6xl w-full overflow-hidden rounded-3xl bg-transparent ring-0 border-0 shadow-2xl"
            >


                <DialogClose className="absolute right-4 top-4 sm:right-6 sm:top-6 hover:cursor-pointer z-50 rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-all">
                    <X className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    <span className="sr-only">Close</span>
                </DialogClose>



                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[550px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >


                    {/* Student Side */}
                    <motion.div
                        className="relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none group cursor-pointer min-h-[300px]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/30 to-black/70 z-10"></div>

                        <motion.img
                            src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg"
                            alt="Employee"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                        />

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-20"
                            initial={{ opacity: 0.3 }}
                            whileHover={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div
                            className="relative z-30 flex flex-col items-center justify-center h-full text-white px-6 py-8 text-center"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                                </svg>
                            </motion.div>
                            <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight">Student Portal</h2>
                            <p className="text-base sm:text-lg mb-4 text-gray-200 max-w-xs">Find your dream job and connect with top companies today.</p>
                            <Link to={'/auth'} onClick={() => setIsOpen(false)}>
                                <motion.button
                                    className="px-6 py-2 hover:cursor-pointer sm:px-8 sm:py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-orange-500/20"
                                    variants={buttonVariants}
                                    initial="initial"
                                    whileHover="hover"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>



                    {/* Employer Side */}
                    <motion.div
                        className="relative overflow-hidden rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none group cursor-pointer min-h-[300px]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/30 to-black/70 z-10"></div>

                        <motion.img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                            alt="Employer"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                        />

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-20"
                            initial={{ opacity: 0.3 }}
                            whileHover={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div
                            className="relative z-30 flex flex-col items-center justify-center h-full text-white px-6 py-8 text-center"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                </svg>
                            </motion.div>
                            <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight">Employer Portal</h2>
                            <p className="text-base sm:text-lg mb-4 text-gray-200 max-w-xs">Find and hire exceptional talent to grow your business.</p>
                            <a href="https://gigs.studentsgigs.com/auth" onClick={() => setIsOpen(false)}>
                                <motion.button
                                    className="px-6 py-2 sm:px-8 hover:cursor-pointer sm:py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-orange-500/20"
                                    variants={buttonVariants}
                                    initial="initial"
                                    whileHover="hover"
                                >
                                    Get Started
                                </motion.button>
                            </a>
                        </motion.div>
                    </motion.div>


                    
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
