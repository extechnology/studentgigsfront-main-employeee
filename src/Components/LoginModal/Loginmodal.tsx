import { Link } from "react-router-dom";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";



// Props interface
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
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()} className="p-0 max-w-6xl overflow-hidden rounded-3xl bg-transparent ring-0 border-0 shadow-2xl">


                    {/* Add a bigger custom close button */}
                    <DialogClose className="absolute right-6 top-6 hover:cursor-pointer z-50 rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-all">
                        <X className="h-8 w-8 text-white" />
                        <span className="sr-only">Close</span>
                    </DialogClose>


                    <motion.div
                        className="grid grid-cols-2 h-[550px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >

                        {/* Employee Side */}
                        <motion.div
                            className="relative overflow-hidden rounded-l-3xl group cursor-pointer"
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
                                className="relative z-30 flex flex-col items-center justify-center h-full text-white px-8 text-center"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div
                                    className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm"
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                                    </svg>
                                </motion.div>
                                <h2 className="text-4xl font-bold mb-3 tracking-tight">Student Portal</h2>
                                <p className="text-lg mb-6 text-gray-200 max-w-xs">Find your dream job and connect with top companies today.</p>

                                <Link to={'/auth'}>
                                    <motion.button
                                        className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-orange-500/20"
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
                            className="relative overflow-hidden rounded-r-3xl group cursor-pointer"
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
                                className="relative z-30 flex flex-col items-center justify-center h-full text-white px-8 text-center"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div
                                    className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm"
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                    </svg>
                                </motion.div>
                                <h2 className="text-4xl font-bold mb-3 tracking-tight">Employer Portal</h2>
                                <p className="text-lg mb-6 text-gray-200 max-w-xs">Find and hire exceptional talent to grow your business.</p>
                                <a href="https://gigs.studentsgigs.com/auth">
                                    <motion.button
                                        className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-orange-500/20"
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
        </>
    );
}