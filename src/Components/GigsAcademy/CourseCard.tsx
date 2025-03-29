import { Button } from '../ui/button';
import { Check, Clock, Users, Award, ChevronRight, Star, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseCardProps {
    title: string;
    duration: string;
    price: string;
    certification: string;
    goal: string;
    topicsCovered: string[];
    idealFor: string[];
    delay?: number;
    imageSrc: string;
}

const CourseCard = ({
    title,
    duration,
    price,
    certification,
    goal,
    topicsCovered,
    idealFor,
    delay = 0,
    imageSrc
}: CourseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showAllTopics, setShowAllTopics] = useState(false);

    const toggleTopics = () => {
        setShowAllTopics(!showAllTopics);
    };

    return (

        <motion.div
            className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.001, duration: 0.5 }}
            whileHover={{
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >


            <div className="relative">


                {/* Glass Blur Header */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10"></div>


                {/* Course Image */}
                <div className="h-52 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-orange-500 mix-blend-overlay transition-opacity duration-300 ${isHovered ? 'opacity-30' : 'opacity-0'}`}></div>
                    <motion.img
                        src={imageSrc}
                        alt={title}
                        loading='lazy'
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                    />
                </div>


                {/* Course Labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <div className="flex items-center gap-1.5 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock size={14} className="text-orange-300" />
                        <span>{duration}</span>
                    </div>

                    <div className="flex items-center gap-1 text-white font-semibold bg-gradient-to-r from-orange-600 to-orange-400 px-4 py-1.5 rounded-full text-sm shadow-lg">
                        {price}
                    </div>
                </div>

                
            </div>


            {/* Course Content */}
            <div className="p-7 relative">

                <div className="absolute top-0 right-0 translate-y-[-50%] translate-x-[-20%] bg-orange-50 p-2.5 rounded-full border-4 border-white shadow-md">
                    <Award size={20} className="text-orange-500" />
                </div>


                <div className="space-y-5">


                    {/* Course Title & Certificate */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1 pr-8 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1">
                            <Star size={14} className="fill-orange-400 text-orange-400" />
                            <Star size={14} className="fill-orange-400 text-orange-400" />
                            <Star size={14} className="fill-orange-400 text-orange-400" />
                            <Star size={14} className="fill-orange-400 text-orange-400" />
                            <Star size={14} className="fill-orange-100 text-orange-300" />
                            <p className="text-xs text-orange-500 font-medium ml-1">{certification}</p>
                        </div>
                    </div>


                    {/* Course Description */}
                    <p className="text-gray-600 text-sm line-clamp-2">{goal}</p>


                    {/* Topics */}
                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl">


                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <div className="h-1 w-4 bg-orange-400 rounded-full"></div>
                            Topics Covered
                        </h4>


                        <ul className="space-y-2.5">


                            <AnimatePresence>
                                {(showAllTopics ? topicsCovered : topicsCovered.slice(0, 3)).map((topic, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ delay: 0.05 * index }}
                                    >
                                        <div className="mt-0.5 flex-shrink-0 bg-orange-100 text-orange-500 rounded-full p-0.5">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="line-clamp-1">{topic}</span>
                                    </motion.li>
                                ))}
                            </AnimatePresence>

                            {topicsCovered.length > 3 && (
                                <motion.button
                                    onClick={toggleTopics}
                                    className="text-sm text-orange-500 font-medium flex items-center justify-center gap-1 mt-1 w-full hover:text-orange-600 transition-colors duration-200"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {showAllTopics ? (
                                        <>
                                            Show less
                                            <ChevronUp size={14} />
                                        </>
                                    ) : (
                                        <>
                                            +{topicsCovered.length - 3} more topics
                                            <ChevronRight size={14} />
                                        </>
                                    )}
                                </motion.button>
                            )}


                        </ul>


                    </div>


                    {/* Ideal For */}
                    <div className="space-y-3 pb-4">


                        <div className="flex items-center gap-2">
                            <Users size={14} className="text-gray-500" />
                            <h4 className="text-sm font-semibold text-gray-700">Ideal For</h4>
                        </div>


                        <div className="flex flex-wrap gap-2">
                            {idealFor.map((profile, index) => (
                                <motion.span
                                    key={index}
                                    className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-100"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * index }}
                                >
                                    {profile}
                                </motion.span>
                            ))}
                        </div>


                    </div>


                    {/* CTA Button */}
                    <a href="#enroll">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-md group transition-all duration-300">
                            <span className="relative z-10">Enroll Now</span>
                            <ChevronRight
                                size={16}
                                className={`ml-1 transition-transform duration-300 group-hover:translate-x-1`}
                            />
                            <span className="absolute bottom-0 left-0 h-1 bg-white/20 w-0 group-hover:w-full transition-all duration-300"></span>
                        </Button>
                    </a>


                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
