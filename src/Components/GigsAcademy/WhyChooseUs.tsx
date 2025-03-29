import { CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import BlurFade from '../ui/blur-fade';

const WhyChooseUs = () => {


    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    // Benefits list
    const benefits = [
        "Learn real-world job skills with hands-on training",
        "Get certified and boost your resume",
        "Improve career opportunities with professional development",
        "Gain essential skills for freelancing, part-time jobs & entrepreneurship",
        "Affordable pricing with high-value certifications"
    ];


    return (


        <section id="why-us" className="py-14 px-6 lg:px-8 relative overflow-hidden">


            <BlurFade delay={0.25} duration={0.5} inView className='w-full flex justify-center items-center'>


                {/* Animated SVG Backgrounds */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-96 h-96 text-orange-100 opacity-30 animate-floating" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M39.5,-65.3C52.5,-58.4,65.2,-50.8,74.3,-39.3C83.3,-27.8,88.6,-12.2,87.8,3.1C87,18.3,80.1,33.3,69.9,44.4C59.7,55.6,46.2,62.9,32.5,68.5C18.8,74,4.8,77.8,-10.2,78.2C-25.3,78.6,-41.4,75.5,-52.6,66.2C-63.8,56.9,-70.2,41.3,-74.4,25.6C-78.5,9.8,-80.5,-6.1,-76.4,-20C-72.4,-33.9,-62.3,-45.7,-49.9,-52.7C-37.6,-59.6,-22.8,-61.6,-8.7,-67.8C5.4,-74,10.8,-84.4,19.9,-84.7C29,-85,41.6,-75.3,39.5,-65.3Z" transform="translate(100 100)" />
                    </svg>

                    <svg className="absolute top-1/4 right-0 w-80 h-80 text-blue-50 opacity-30 animate-spin-slow animation-delay-1500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M47.7,-73.2C62.4,-67.3,75.1,-56.3,78.5,-42.5C81.9,-28.7,75.9,-12.2,71.5,2.5C67.1,17.3,64.3,30.2,57.3,40.7C50.3,51.1,39.2,59.1,26.2,67.2C13.2,75.3,-1.8,83.6,-14.2,81.2C-26.7,78.8,-36.7,65.8,-47.9,53.9C-59.1,42.1,-71.5,31.5,-78.1,16.8C-84.8,2.1,-85.6,-16.5,-77.8,-30.1C-70,-43.7,-53.6,-52.2,-38.8,-57.6C-23.9,-63,-12,-65.3,1.7,-67.9C15.3,-70.6,30.7,-73.4,47.7,-73.2Z" transform="translate(100 100)" />
                    </svg>
                </div>


                <div className="max-w-7xl mx-auto">


                    {/* Header */}
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium gap-2 mb-4 animate-fade-in">
                            <span className="relative">
                                Our Advantages
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up">
                            Why Choose <span className="text-gradient relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-orange-300/30 after:-z-10">Gig Skills Academy</span>?
                        </h2>
                        <p className="text-gray-600 text-lg animate-fade-up" style={{ animationDelay: '100ms' }}>
                            We focus on practical, in-demand skills that get you job-ready and set you apart in today's competitive market.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">


                        {/* Left Section */}
                        <div className="relative">

                            <div className="glass-card bg-white/90 p-8 rounded-3xl shadow-xl animate-fade-in-left relative z-10 backdrop-blur-md border border-white/20">
                                <ul className="space-y-6">
                                    {benefits.map((benefit, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 animate-fade-in-left ${hoveredIndex === index ? 'bg-orange-50/50 shadow-sm' : ''
                                                }`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <span className={`text-orange-500 mt-1 flex-shrink-0 transition-transform duration-300 ${hoveredIndex === index ? 'scale-125' : ''
                                                }`}>
                                                <CheckCircle size={24} className="drop-shadow-sm" />
                                            </span>
                                            <span className="text-gray-700 font-medium">{benefit}</span>
                                            {hoveredIndex === index && (
                                                <span className="ml-auto text-orange-500">
                                                    <ArrowRight size={18} className="animate-pulse" />
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl transform -rotate-1"></div>
                            <div className="absolute -top-4 -left-4 -z-20 w-full h-full bg-gradient-to-tr from-orange-300 to-orange-200 rounded-3xl transform rotate-3 opacity-70"></div>

                        </div>



                        {/* Right Section */}
                        <div className="relative animate-fade-in-right">

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] group">
                                <img
                                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800"
                                    alt="Student learning with laptop"
                                    className="rounded-3xl shadow-lg object-cover transition-transform duration-700 group-hover:scale-110 h-[500px] w-full object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-[inherit] opacity-20 blur-xl"></div>

                            <div className="absolute -top-8 left-8  bg-white/60 animate-bounce duration-3000 px-6 py-4 rounded-xl shadow-lg backdrop-blur-md border border-white/20 max-w-xs animate-floating z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <span className="text-xl font-bold">98%</span>
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium">Of our students report significant skill improvement after completing our courses</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 right-8 bg-white/60 animate-bounce duration-3000 px-5 py-3 rounded-xl shadow-lg backdrop-blur-md border border-white/20 animate-floating animation-delay-1000 z-20">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                        <span className="text-orange-600 text-sm font-bold">24/7</span>
                                    </div>
                                    <p className="text-xs text-gray-900">Support available</p>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </BlurFade>

        </section>
    );
};

export default WhyChooseUs;
