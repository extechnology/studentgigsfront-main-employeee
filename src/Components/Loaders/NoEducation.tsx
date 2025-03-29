import { GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoEducation = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-blue-50 to-white rounded-xl">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-blue-600 animate-bounce" />
                </div>
                <BookOpen className="absolute -right-2 -top-2 w-8 h-8 text-blue-400 animate-spin-slow" />
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Start Your Educational Journey
            </h3>

            <p className="text-blue-600 text-center max-w-sm mb-6">
                Showcase your academic achievements and learning path
            </p>

            <Link to="/settings">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Add Education
                </button>

            </Link>
            
        </div>
    );
};

export default NoEducation;