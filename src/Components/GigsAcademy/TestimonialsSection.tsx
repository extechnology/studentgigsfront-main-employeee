import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from 'lucide-react';
import BlurFade from '../ui/blur-fade';

// Interface for testimonial
interface Testimonial {
    id: number;
    name: string;
    position: string;
    quote: string;
    rating: number;
    image: string;
}


// Testimonial data
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya Singh",
        position: "Customer Service Professional",
        quote: "The Workspace Essentials course completely transformed my approach to professional interactions. I landed my first job within weeks of completing the course!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        position: "Sales Executive",
        quote: "The Professional Excellence course gave me confidence and skills to excel in sales. The practical training and role-play sessions were incredibly valuable.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Neha Kapoor",
        position: "Entrepreneur",
        quote: "I started my own small business after completing the Professional Excellence course. The entrepreneurship module was eye-opening and gave me the push I needed.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
];

const TestimonialsSection = () => {


    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');


    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection('prev');
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);


    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection('next');
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);


    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [activeIndex, isAnimating, handleNext]);


    return (

        <section className="py-16 px-3 lg:px-8 relative overflow-hidden">

            <BlurFade delay={0.25} duration={0.5} inView className='w-full flex justify-center items-center'>



                {/* Animated SVG Backgrounds */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg className="absolute top-0 left-1/4 w-64 h-64 text-orange-100 opacity-20 animate-floating" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M57.8,-48.6C68.7,-35,67.7,-11.3,60.4,6.7C53.1,24.7,39.6,37,22.3,48.3C5,59.7,-16.1,70.1,-35.5,65.9C-54.9,61.7,-72.6,42.9,-76.9,21.5C-81.2,0,-72,-23.3,-57.8,-38.8C-43.6,-54.3,-24.4,-62,-1.5,-60.9C21.3,-59.8,46.9,-62.1,57.8,-48.6Z" transform="translate(100 100)" />
                    </svg>

                    <svg className="absolute bottom-0 right-1/4 w-72 h-72 text-blue-50 opacity-30 animate-floating animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M48,-78.8C61.9,-70.4,72.9,-58.1,77.8,-43.9C82.8,-29.7,81.8,-13.9,79.9,1.1C78,16,75.3,31.9,67.4,44.2C59.5,56.5,46.5,65.2,32.8,70.4C19.2,75.6,4.8,77.3,-10.2,77.3C-25.2,77.2,-50.5,75.4,-64.4,63.8C-78.4,52.3,-81.2,31.2,-80.7,12C-80.3,-7.2,-76.7,-24.4,-68.3,-39.3C-59.9,-54.2,-46.7,-66.9,-32,-75.1C-17.2,-83.3,-1,-87.2,14.4,-85.5C29.9,-83.9,59.8,-76.7,48,-78.8Z" transform="translate(100 100)" />
                    </svg>
                </div>



                <div className="max-w-6xl mx-auto">


                    {/* Header */}
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium gap-2 mb-4 animate-fade-in">
                            <MessageSquare size={14} className="animate-pulse" />
                            <span>Student Stories</span>
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up">
                            What Our <span className="text-gradient relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-orange-300/30 after:-z-10">Students Say</span>
                        </h2>
                        <p className="text-gray-600 text-lg animate-fade-up" style={{ animationDelay: '100ms' }}>
                            Real success stories from students who have transformed their careers through our courses.
                        </p>
                    </div>


                    {/* Testimonials */}
                    <div className="relative">

                        <div className="glass-card bg-white/90 px-6 py-10 md:p-12 rounded-3xl shadow-xl backdrop-blur-md border border-white/20">

                            <div className="flex flex-col md:flex-row gap-10 items-center relative overflow-hidden py-5">


                                <div className="w-32 h-32 md:w-48 md:h-48 relative flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 animate-pulse-slow"></div>
                                    <div className="absolute inset-1 rounded-full overflow-hidden bg-white">
                                        <img
                                            src={testimonials[activeIndex].image}
                                            alt={testimonials[activeIndex].name}
                                            loading='lazy'
                                            className={`w-full h-full object-cover rounded-full transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'
                                                }`}
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full p-2.5 shadow-lg">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} fill="white" />
                                            <span className="text-sm font-bold">{testimonials[activeIndex].rating}.0</span>
                                        </div>
                                    </div>

                                </div>

                                <div className={`flex-1 transition-all duration-500 transform ${isAnimating
                                    ? direction === 'next'
                                        ? '-translate-x-10 opacity-0'
                                        : 'translate-x-10 opacity-0'
                                    : 'translate-x-0 opacity-100'
                                    }`}>
                                    <div className="relative">
                                        <Quote className="absolute -top-6 -left-2 text-orange-200/80 w-12 h-12 rotate-180" />
                                        <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 relative z-10 pl-4">
                                            "{testimonials[activeIndex].quote}"
                                        </blockquote>
                                    </div>
                                    <div className="border-t border-orange-100 pt-4 mt-4">
                                        <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                                        <p className="text-orange-500">{testimonials[activeIndex].position}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center mt-8 gap-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setDirection(index > activeIndex ? 'next' : 'prev');
                                            setActiveIndex(index);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-8 shadow-md'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                        </div>

                        <button
                            onClick={handlePrev}
                            className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-orange-50 transition-colors border border-orange-100/50 group z-10"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute top-1/2 -translate-y-1/2 -right-4 md:right-2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-orange-50 transition-colors border border-orange-100/50 group z-10"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
                        </button>

                    </div>
                </div>

            </BlurFade>

        </section>
    );
};

export default TestimonialsSection;
