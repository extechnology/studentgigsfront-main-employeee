import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { motion } from 'framer-motion';
import { AnimatedShinyText } from '../magicui/animated-shiny-text';

const AcademyHero = () => {


    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    // Slider Images
    const heroImages = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
    ];


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        // Create autoplay functionality
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % heroImages.length);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [heroImages.length]);



    return (

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-5">


            {/* Animated SVG Backgrounds */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg className="absolute top-1/4 -left-10 w-72 h-72 text-orange-100 opacity-50 animate-spin-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M38.5,-65.1C48.5,-55.9,54.2,-42.1,62.1,-29C70,-16,80.2,-3.7,79.3,7.8C78.3,19.3,66.3,29.9,55.7,38.7C45.1,47.5,35.9,54.5,25.5,59.8C15.1,65.1,3.5,68.8,-8.9,70.2C-21.3,71.6,-34.5,70.9,-45.9,65.1C-57.3,59.3,-66.8,48.6,-72.8,36.2C-78.8,23.8,-81.3,9.7,-78.6,-3C-76,-15.7,-68.3,-27.1,-59.2,-36.5C-50.1,-45.9,-39.7,-53.4,-28.8,-62C-17.9,-70.5,-7.3,-80.1,3.6,-85.7C14.4,-91.3,28.5,-92.9,38.5,-81.2C48.5,-69.5,54.2,-44.3,52.1,-30.1C50,-15.9,40,-4.8,38.5,-0.1C37,4.7,44,16.7,44.7,26.7C45.5,36.7,39.9,44.7,33.1,57.6C26.2,70.5,18.1,88.4,7,93.7C-4.1,99,-18.3,91.8,-31.1,83.5C-43.9,75.3,-55.5,66.1,-63.9,54.5C-72.4,42.9,-77.7,28.9,-80,14.7C-82.3,0.4,-81.7,-14.2,-76.3,-26.3C-70.9,-38.5,-60.6,-48.1,-48.9,-57.7C-37.1,-67.2,-24,-76.6,-9.6,-81.1C4.9,-85.6,20.5,-85.3,28.3,-76.6C36.1,-67.9,36.1,-50.8,38.5,-39.2C40.9,-27.6,45.7,-21.4,55.4,-13.2C65.2,-5,79.8,5.1,81.2,14.1C82.7,23.1,70.8,31,60.4,36.6C49.9,42.2,40.8,45.5,32.1,52.4C23.3,59.3,14.9,69.8,3.3,75.8C-8.3,81.7,-22.9,83.1,-35.9,79.1C-48.9,75.2,-60.2,65.8,-65.4,54C-70.6,42.1,-69.7,27.8,-71.8,13.8C-73.9,-0.2,-79,-13.9,-76.5,-25.7C-74,-37.4,-63.9,-47.1,-52.5,-58.2C-41.1,-69.3,-28.4,-81.8,-14.1,-86.5C0.3,-91.1,16.2,-88,29.3,-81.8C42.4,-75.7,52.7,-66.5,58.4,-55.7C64.1,-45,65.2,-32.8,68.9,-19.9C72.7,-7,79.1,6.6,76.8,17.8C74.6,29,63.8,37.8,53,44.8C42.2,51.9,31.5,57.2,19.7,63.1C7.8,69.1,-5.4,75.8,-17.7,75.2C-30,74.6,-41.5,66.7,-52.3,58.2C-63.1,49.7,-73.3,40.5,-75.5,29.3C-77.8,18.2,-72.1,5,-69.6,-9.2C-67.1,-23.4,-67.7,-38.7,-61.1,-51.3C-54.5,-64,-40.6,-74.1,-26.1,-78.1C-11.7,-82.1,3.3,-80,14.1,-73.2C25,-66.3,31.6,-54.7,41.4,-45.5C51.3,-36.3,64.3,-29.5,69.7,-19.4C75.1,-9.2,72.9,4.3,69.4,16.9C65.9,29.5,61.1,41.2,54.4,55.3C47.7,69.4,39.1,86,27.5,91.4C15.9,96.8,1.3,91,-10.6,84.7C-22.5,78.4,-31.7,71.5,-42.8,65.1C-53.9,58.7,-66.9,52.8,-72.3,42.6C-77.7,32.4,-75.4,17.9,-70.9,5.9C-66.5,-6.1,-59.8,-15.5,-54.7,-25.5C-49.5,-35.5,-45.8,-46,-38.2,-53.4C-30.6,-60.8,-19.1,-65.2,-5.9,-72.4C7.3,-79.5,22.3,-89.5,33.2,-87.1C44.1,-84.7,51,-69.9,54.1,-56.9C57.2,-43.9,56.5,-32.8,61.1,-21.3C65.7,-9.9,75.5,1.9,77.1,14.5C78.6,27.1,71.9,40.5,61.4,48.3C50.9,56.2,36.6,58.4,25.1,66.4C13.5,74.4,4.7,88.1,-4.2,94.1C-13.1,100.1,-22.3,98.4,-31.9,94.8C-41.5,91.3,-51.5,85.8,-58.9,76.9C-66.3,68.1,-71,55.8,-77.1,43.6C-83.1,31.4,-90.6,19.3,-92.3,6.1C-94.1,-7.1,-90.2,-21.5,-83.4,-33.3C-76.7,-45.1,-67,-54.5,-55.8,-62.2C-44.5,-69.9,-31.6,-75.9,-17.9,-79.6C-4.2,-83.3,10.3,-84.6,22.5,-80.1C34.7,-75.6,44.6,-65.1,52,-54.4C59.5,-43.7,64.5,-32.7,67.3,-21.2C70.1,-9.6,70.8,2.5,70.1,16.1C69.3,29.7,67.2,44.9,59.3,53.6C51.4,62.4,37.8,64.8,24.8,69.7C11.7,74.6,-0.8,82,-14.1,84.2C-27.4,86.4,-41.6,83.3,-50.6,74.7C-59.6,66.1,-63.6,52.1,-67,38.9C-70.4,25.8,-73.3,13.5,-77.8,0.1C-82.4,-13.4,-88.7,-27.9,-87.3,-42.3C-85.9,-56.7,-76.7,-71.2,-64.2,-80.2C-51.7,-89.2,-35.8,-92.9,-20.9,-92.9C-6,-92.9,7.8,-89.3,20.5,-83.8C33.2,-78.3,44.7,-71,54.4,-61.3C64.2,-51.7,72.2,-39.7,70.3,-27.7C68.4,-15.6,56.6,-3.5,51.5,7.6C46.5,18.6,48.2,28.6,42.9,33.2C37.6,37.8,25.3,37,16.8,41.3C8.4,45.6,3.7,55,0.7,56.4C-2.3,57.7,-3.5,51,-9.9,50.2C-16.2,49.4,-27.6,54.6,-35.1,52.4C-42.6,50.3,-46.1,40.9,-49.6,31.7C-53.2,22.5,-56.8,13.5,-56.9,4.4C-57,-4.7,-53.6,-14,-48.8,-22.5C-44,-31,-37.9,-38.7,-30.1,-42.7C-22.3,-46.7,-12.8,-47,-2.6,-50.5C7.7,-54,18.7,-60.6,29.3,-63.7C39.9,-66.8,50.1,-66.4,60.2,-62C70.3,-57.7,80.2,-49.3,83,-38.9C85.8,-28.5,81.5,-16,76.7,-5.5C71.9,5,66.7,13.4,60.6,20.3C54.5,27.1,47.5,32.4,40.2,38.7C32.9,45,25.3,52.1,15.7,54.8C6.1,57.5,-5.7,55.7,-16.2,52.3C-26.7,48.9,-36,43.8,-44.1,36.7C-52.2,29.6,-59.2,20.5,-63.4,9.8C-67.6,-0.9,-69.1,-13.2,-66.8,-25.8C-64.6,-38.3,-58.8,-51.2,-49.6,-61.7C-40.4,-72.2,-27.9,-80.3,-14.1,-81.6C-0.3,-82.9,14.8,-77.4,25.2,-68.7C35.7,-60,41.4,-48.2,49.3,-37.8C57.2,-27.5,67.3,-18.6,71.1,-7.5C74.9,3.6,72.5,16.9,70,30.7C67.5,44.5,64.9,58.9,56.2,64.9C47.6,70.9,32.9,68.7,20.5,71.9C8,75.2,-3.2,83.9,-15.4,85.8C-27.5,87.7,-40.6,82.7,-49.6,73.6C-58.7,64.5,-63.8,51.2,-70.7,38.5C-77.5,25.8,-86.1,13.6,-87.3,-0.1C-88.4,-13.8,-82.1,-29,-72.8,-40.1C-63.5,-51.3,-51.1,-58.3,-38.5,-66.3C-25.9,-74.2,-13,-83,-2,-83.9C9,-84.7,18,-77.6,30.1,-74.7C42.1,-71.8,57.2,-73.2,65.9,-67.2C74.6,-61.3,76.9,-48.1,75.3,-36.6C73.7,-25.1,68.1,-15.3,65.6,-5.5C63.1,4.3,63.6,14.2,59.5,21.5C55.4,28.9,46.8,33.7,40.2,41.7C33.7,49.7,29.3,60.9,20.8,65.4C12.3,70,-0.3,68,-11.5,65.5C-22.8,63,-32.6,60,-41.7,54.5" transform="translate(100 100)" />
                </svg>

                <svg className="absolute bottom-1/3 right-0 w-64 h-64 text-blue-100 opacity-40 animate-spin-slow animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M37.9,-65.5C49.1,-60.9,58.4,-51.1,62.8,-39.6C67.2,-28.1,66.7,-14.1,62.4,-3C58.1,8.1,50,16.1,42.8,21.9C35.6,27.6,29.3,31,22.3,38.3C15.2,45.6,7.6,56.9,-3.2,62.1C-14,67.4,-28,66.8,-39.5,61.3C-51,55.8,-60,45.4,-64.8,33.3C-69.5,21.3,-70,7.6,-70.7,-7C-71.5,-21.7,-72.5,-37.4,-66,-49.8C-59.4,-62.2,-45.3,-71.3,-31.5,-74.2C-17.7,-77.1,-4.4,-74,-0.6,-72.8C3.3,-71.7,6.5,-72.6,11.3,-68.4C16.1,-64.3,22.8,-55.2,37.9,-65.5Z" transform="translate(100 100)" />
                </svg>

                <svg className="absolute top-1/2 left-1/3 w-48 h-48 text-orange-200 opacity-30 animate-floating animation-delay-1000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M47.7,-73.2C62.4,-67.3,75.1,-56.3,78.5,-42.5C81.9,-28.7,75.9,-12.2,71.5,2.5C67.1,17.3,64.3,30.2,57.3,40.7C50.3,51.1,39.2,59.1,26.2,67.2C13.2,75.3,-1.8,83.6,-14.2,81.2C-26.7,78.8,-36.7,65.8,-47.9,53.9C-59.1,42.1,-71.5,31.5,-78.1,16.8C-84.8,2.1,-85.6,-16.5,-77.8,-30.1C-70,-43.7,-53.6,-52.2,-38.8,-57.6C-23.9,-63,-12,-65.3,1.7,-67.9C15.3,-70.6,30.7,-73.4,47.7,-73.2Z" transform="translate(100 100)" />
                </svg>
            </div>


            <div className="mx-auto px-6 lg:px-8 relative z-10">


                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">


                    {/* Text Section */}
                    <div className={`flex-1 max-w-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

                        <div className="space-y-6 text-center lg:text-left">

                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium gap-2 animate-pulse-slow">

                                <AnimatedShinyText shimmerWidth={100} className='flex items-center justify-center transition ease-out text-orange-400' >
                                    <Sparkles size={16} className="me-1" />
                                    <span>Transform Your Career</span>
                                </AnimatedShinyText>

                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="relative inline-block overflow-hidden">
                                    <span className="text-gradient relative z-10 after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-3 after:bg-orange-300/50 after:-z-10 after:transform after:skew-y-3">Practical Courses</span>
                                </span>
                                <br className="md:hidden" />
                                {" "}for{" "}
                                <div className="relative inline-block mt-2">
                                    <span className="relative z-10">Career & Gig</span>
                                    <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-orange-300 to-orange-400 opacity-30 transform -rotate-1"></span>
                                </div>
                                {" "}Success
                            </h1>

                            <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                                Learn real-world job skills with hands-on training. Get certified and boost your resume for better career opportunities.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">

                                <a href='#courses'>

                                    <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 py-6 text-lg relative overflow-hidden group">
                                        <span className="relative z-10">Explore Courses</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </Button>

                                </a>

                                <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300">
                                    Learn More
                                </Button>

                            </div>

                        </div>

                    </div>


                    {/* Slider */}
                    <div className={`flex-1 relative max-w-lg w-full transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

                        <Carousel className="relative glass-card rounded-3xl overflow-hidden shadow-2xl">

                            <CarouselContent>
                                {heroImages.map((image, index) => (
                                    <CarouselItem
                                        key={index}
                                        className={`absolute w-full transition-opacity duration-1000 overflow-hidden ease-in-out ${activeIndex === index ? "opacity-100 relative" : "opacity-0 invisible absolute"
                                            }`}
                                    >
                                        <div className="relative p-6 pb-0 overflow-hidden">
                                            <motion.img
                                                src={image}
                                                alt={`Student learning ${index + 1}`}
                                                className="rounded-t-2xl object-cover h-[300px] w-full"
                                                initial={{ scale: 1 }}
                                                animate={{
                                                    scale: activeIndex === index ? 1.05 : 1,
                                                    opacity: activeIndex === index ? 1 : 0,
                                                }}
                                                transition={{ duration: 4 }}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                        </Carousel>


                        <div className="absolute -top-6 -left-6 -z-10 w-full h-full bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl transform rotate-1"></div>
                        <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-gradient-to-tr from-orange-300 to-orange-200 rounded-3xl transform -rotate-2 opacity-70"></div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default AcademyHero;