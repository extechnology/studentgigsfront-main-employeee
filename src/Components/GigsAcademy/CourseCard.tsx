import { Button } from '../ui/button';
import { Check, Target, AlertTriangle, Briefcase, Award, ChevronRight, Zap, Users, Trophy, Star } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnrollmentModal from './EnrollmentModal';





export interface CourseCardProps {
    id: number;
    title: string;
    subtitle: string;
    short_description: string;
    highlight_line: string;
    fee: string;
    important_rules: string;
    certification_title: string;
    certification_basis: string;
    reality_check_intro: string;
    reality_check_conclusion: string;
    final_call_to_action: string;
    is_active: boolean;
    features: {
        achievement: string[];
        difference: string[];
        reality_check_point: string[];
        target_audience: string[];
        what_you_will_do: string[];
    };
    days: Array<{
        id: number;
        day_number: number;
        title: string;
        mode: string;
        is_core_day: boolean;
        topics: Array<{
            id: number;
            description: string;
            order: number;
        }>;
    }>;
    delay?: number;
}



const CourseCard = ({
    title,
    subtitle,
    short_description,
    highlight_line,
    fee,
    important_rules,
    certification_title,
    certification_basis,
    reality_check_intro,
    reality_check_conclusion,
    final_call_to_action,
    features,
    days,
    delay = 0,
}: CourseCardProps) => {



    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');


    return (



        <motion.div
            className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 border border-gray-100 flex flex-col lg:flex-row relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.001, duration: 0.6, ease: "easeOut" }}
            whileHover={{
                y: -5,
                boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.12)'
            }}
        >



            {/* Left Side (Modern Hero Cover) */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 relative flex flex-col justify-between text-white overflow-hidden">


                {/* Decorative Modern Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>


                <div className="relative z-10 space-y-6 md:space-y-8">


                    <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold backdrop-blur-md">
                        <Zap size={14} className="fill-orange-400" />
                        <span className="uppercase tracking-wider">7-Day Challenge</span>
                    </div>


                    <div>
                        <h2 className="text-[2rem] leading-[1.1] md:text-5xl font-extrabold tracking-tight mb-3 md:mb-4">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h2>
                        <p className="text-gray-300 font-medium md:font-semibold text-base md:text-xl">{subtitle}</p>
                    </div>


                    <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/[0.08] backdrop-blur-sm shadow-inner">
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                            {short_description}
                        </p>
                        <div className="flex items-start gap-3 text-orange-400 text-sm md:text-base font-bold">
                            <Target size={20} className="shrink-0 mt-0.5" />
                            <p>{highlight_line.replace('👉 ', '')}</p>
                        </div>
                    </div>


                </div>

                <div className="hidden lg:block relative z-10 mt-12 space-y-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase mb-1">Enrollment Fee</p>
                            <p className="text-5xl font-extrabold text-white flex items-baseline gap-1">
                                <span className="text-3xl text-orange-500">₹</span>{parseInt(fee)}
                            </p>
                        </div>
                    </div>


                    <div className="space-y-3">
                        <EnrollmentModal>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl h-16 text-lg font-bold shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300 group">
                                Start Your Transformation
                                <ChevronRight size={22} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                            </Button>
                        </EnrollmentModal>
                        <p className="text-center text-xs md:text-sm text-gray-400 font-medium">{final_call_to_action.split('\n')[1]?.replace('👉 ', '')}</p>
                    </div>


                </div>


            </div>



            {/* Right Side (Modern Content) */}
            <div className="lg:w-3/5 bg-[#FAFAFA] p-6 md:p-12 flex flex-col h-full relative">


                {/* Modern Pill Tabs */}
                <div className="flex p-1.5 bg-gray-200/60 rounded-2xl mb-10 relative z-10 w-fit border border-gray-200/80 backdrop-blur-sm shadow-inner">

                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-2.5 text-sm md:text-base font-bold tracking-wide transition-all rounded-xl relative z-10 ${activeTab === 'overview' ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                        Overview
                    </button>

                    <button
                        onClick={() => setActiveTab('curriculum')}
                        className={`px-6 py-2.5 text-sm md:text-base font-bold tracking-wide transition-all rounded-xl relative z-10 ${activeTab === 'curriculum' ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                        7-Day Curriculum
                    </button>

                </div>




                <div className="flex-1 overflow-y-auto pr-2 relative z-10 custom-scrollbar">


                    <AnimatePresence mode="wait">


                        {activeTab === 'overview' ? (

                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >

                                {/* Reality Check */}
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 bg-red-100/50 text-red-500 rounded-xl shadow-sm border border-red-100">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">The Reality Check</h3>
                                    </div>
                                    <p className="text-gray-600 text-base mb-4 font-medium">{reality_check_intro}</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {features.reality_check_point.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-gray-600 font-medium">
                                                <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm md:text-base font-bold text-orange-700">
                                        {reality_check_conclusion.replace('👉 ', '')}
                                    </div>
                                </div>

                                {/* What You Will Do */}
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 bg-blue-100/50 text-blue-500 rounded-xl shadow-sm border border-blue-100">
                                            <Briefcase size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">What You Will Actually Do</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        {features.what_you_will_do.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="bg-blue-500 text-white rounded-full p-1 mt-0.5 shrink-0 shadow-sm">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm md:text-base text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Target Audience */}
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 bg-purple-100/50 text-purple-500 rounded-xl shadow-sm border border-purple-100">
                                            <Users size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">Who Is This For?</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {features.target_audience.map((audience, i) => (
                                            <div key={i} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm md:text-base font-medium border border-purple-100 shadow-sm">
                                                {audience}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 bg-yellow-100/50 text-yellow-600 rounded-xl shadow-sm border border-yellow-100">
                                            <Trophy size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">What You Will Achieve</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        {features.achievement.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="bg-yellow-400 text-white rounded-full p-1 mt-0.5 shrink-0 shadow-sm">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm md:text-base text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* The Difference */}
                                <div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 bg-indigo-100/50 text-indigo-500 rounded-xl shadow-sm border border-indigo-100">
                                            <Star size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">How Is This Different?</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        {features.difference.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="bg-indigo-500 text-white rounded-full p-1 mt-0.5 shrink-0 shadow-sm">
                                                    <Zap size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm md:text-base text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certification & Rules */}
                                <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-gray-200 shadow-sm">
                                    <div className="flex flex-col md:flex-row items-start gap-5">
                                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-500 shrink-0 shadow-sm">
                                            <Award size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-gray-900 mb-2 text-lg">{certification_title}</h4>
                                            <p className="text-sm text-gray-500 mb-4 font-medium">Based on: {certification_basis.split('\n').join(' • ')}</p>
                                            <div className="flex flex-col gap-2">
                                                {important_rules.split('\n').map((rule, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                        <AlertTriangle size={14} className="text-orange-500 shrink-0" />
                                                        {rule.replace('👉 ', '')}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="curriculum"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="pl-2 pt-2"
                            >
                                {days.map((day, index) => (
                                    <div key={day.id} className="relative flex gap-5 pb-8 last:pb-0">
                                        {/* Timeline Line & Dot */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-5 h-5 rounded-full border-[4px] shadow-sm z-10 shrink-0 ${day.is_core_day ? 'bg-orange-500 border-white' : 'bg-gray-300 border-white'}`}></div>
                                            {index !== days.length - 1 && (
                                                <div className="w-[2px] bg-gray-200 flex-1 my-1 rounded-full"></div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-2xl p-5 md:p-6 flex-1 shadow-sm mt-[-4px]">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                                                <div>
                                                    <span className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Day {day.day_number}</span>
                                                    <h4 className="font-extrabold text-gray-800 text-base md:text-lg">{day.title}</h4>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase w-fit tracking-wide ${day.mode === 'offline' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                                                    {day.mode.replace('_', ' ')}
                                                </span>
                                            </div>

                                            <ul className="space-y-2.5">
                                                {day.topics.map((topic) => (
                                                    <li key={topic.id} className="flex items-start gap-3 text-sm md:text-base text-gray-600 font-medium">
                                                        <div className="bg-green-100 text-green-600 rounded-full p-0.5 mt-0.5 shrink-0">
                                                            <Check size={12} strokeWidth={3} />
                                                        </div>
                                                        <span>{topic.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Enrollment Section (Bottom of the Card) */}
            <div className="block lg:hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 relative z-20 border-t border-gray-800 rounded-b-[2.5rem]">
                <div className="flex flex-col gap-5">
                    <div>
                        <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase mb-1">Enrollment Fee</p>
                        <p className="text-4xl font-extrabold text-white flex items-baseline gap-1">
                            <span className="text-2xl text-orange-500">₹</span>{parseInt(fee)}
                        </p>
                    </div>

                    <div className="space-y-3 w-full">
                        <EnrollmentModal>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 group">
                                Start Your Transformation
                                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                            </Button>
                        </EnrollmentModal>
                        <p className="text-center text-xs text-gray-400 font-medium">{final_call_to_action.split('\n')[1]?.replace('👉 ', '')}</p>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default CourseCard;
