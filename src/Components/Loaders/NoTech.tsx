
import { Code, Cpu, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoTechnicalSkills = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 rounded-xl">
            <div className="relative w-40 h-40 mb-6">
                {/* Animated code lines background */}
                <div className="absolute inset-0 flex flex-col gap-2 opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="h-2 bg-indigo-400 rounded animate-pulse"
                            style={{
                                width: `${Math.random() * 50 + 50}%`,
                                animationDelay: `${i * 0.2}s`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-20 h-20 text-indigo-600" />
                </div>

                <Cpu className="absolute top-0 right-0 w-8 h-8 text-indigo-400 animate-spin-slow" />
                <Database className="absolute bottom-0 left-0 w-8 h-8 text-indigo-400 animate-bounce" />
            </div>

            <h3 className="text-2xl font-bold text-indigo-900 mb-3 text-center">
                Technical Expertise Awaits
            </h3>

            <p className="text-indigo-600 text-center max-w-sm mb-6">
                List your programming languages, frameworks, and technical tools
            </p>

            <Link to="/settings">
                <button className="group relative px-8 py-3 bg-indigo-600 text-white rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500 transform transition-transform group-hover:translate-y-full duration-300" />
                    <span className="relative flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Add Technical Skills
                    </span>
                </button>
            </Link>
        </div>
    );
};

export default NoTechnicalSkills;