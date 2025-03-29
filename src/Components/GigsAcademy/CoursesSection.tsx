import BlurFade from '../ui/blur-fade';
import CourseCard from './CourseCard';
import { CourseData } from '@/Hooks/Utils';
import CourseCardLoader from '../Loaders/CourseCardLoader';
import NoCourseLoader from '../Loaders/NoCourseLoader';




const CoursesSection = () => {


    // Fetch course data
    const { data, isLoading, isError, isFetching } = CourseData();


    return (

        <section id="courses" className="py-20 px-2 lg:px-8 bg-gray-50 relative overflow-hidden">


            <BlurFade delay={0.25} duration={0.5} inView className='w-full flex justify-center items-center'>

                {/* Animated SVG Backgrounds */}
                <div className="absolute inset-0 -z-10 overflow-hidden">

                    <svg className="absolute top-0 right-0 w-80 h-80 text-orange-100 opacity-20 animate-floating" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M45.3,-76.2C59.6,-69.5,72.8,-59.4,79.6,-45.9C86.4,-32.3,86.8,-15.1,83.7,-0.2C80.5,14.8,73.8,27.7,65,38.7C56.2,49.7,45.4,58.7,33.2,65.5C21,72.3,7.5,76.9,-6.5,77.8C-20.5,78.7,-35,76,-48.2,69.3C-61.5,62.6,-73.5,52.1,-80.3,38.7C-87.1,25.3,-88.7,9.1,-86.6,-6.6C-84.4,-22.2,-78.6,-37.3,-69,-50.6C-59.4,-63.9,-46,-75.4,-31.7,-81.5C-17.3,-87.7,-2,-88.4,11.9,-85.8C25.8,-83.1,51.5,-77.1,45.3,-76.2Z" transform="translate(100 100)" />
                    </svg>

                    <svg className="absolute bottom-0 left-0 w-72 h-72 text-blue-50 opacity-30 animate-floating animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M39.9,-67.3C52.5,-60.2,64,-51.5,71.4,-39.7C78.9,-27.9,82.4,-13.9,81.9,-0.3C81.5,13.3,77.1,26.6,69.8,38.2C62.5,49.9,52.1,59.8,40,65.4C27.9,71,13.9,72.3,-0.7,73.5C-15.4,74.7,-30.8,75.8,-44.4,70.3C-58,64.8,-69.9,52.7,-75.9,38.2C-81.9,23.7,-82.1,6.8,-80.2,-9.7C-78.4,-26.1,-74.4,-42.2,-64.7,-53C-54.9,-63.8,-39.4,-69.3,-25.4,-75.5C-11.3,-81.7,1.2,-88.5,13.4,-87.1C25.5,-85.7,37.4,-76,39.9,-67.3Z" transform="translate(100 100)" />
                    </svg>

                    <svg className="absolute top-1/3 right-1/3 w-48 h-48 text-orange-200 opacity-20 animate-spin-slow animation-delay-1500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M32.1,-54.7C43.6,-50,56.2,-45.8,64.1,-37C72,-28.2,75.2,-14.1,76.2,0.6C77.1,15.3,75.8,30.6,68.7,42.9C61.5,55.2,48.5,64.5,34.8,68.2C21.2,71.9,6.9,69.9,-4.8,64.9C-16.6,59.9,-25.8,51.9,-39.1,45.5C-52.4,39.1,-70,34.3,-76.4,24.2C-82.8,14.1,-78.1,-1.2,-73.1,-15.9C-68.1,-30.5,-62.9,-44.5,-52.8,-50C-42.7,-55.5,-27.7,-52.5,-15.3,-56.3C-2.9,-60,9.9,-70.6,19.1,-69.3C28.3,-68,41,-67.8,32.1,-54.7Z" transform="translate(100 100)" />
                    </svg>

                </div>


                {/* Course Crads */}
                <div className="max-w-7xl mx-auto">


                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4 animate-fade-in">
                            Our Curriculum
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">
                            Available <span className="text-gradient">Courses</span>
                        </h2>
                        <p className="text-gray-600 animate-fade-up" style={{ animationDelay: '100ms' }}>
                            Designed to provide practical, hands-on training that prepares you for real-world success.
                        </p>
                    </div>
                    

                    {/* No Course */}
                    {data?.length === 0 && (

                        <NoCourseLoader />
                    )}


                    {/* Course Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {isLoading || isFetching || isError ? (

                            Array.from({ length: 2 }).map((_, index) => <CourseCardLoader key={index} />)

                        ) : (

                            data?.map((course: any, index: number) => (
                                <CourseCard key={index} {...course} delay={index * 200} />
                            ))

                        )}

                    </div>

                </div>



            </BlurFade>

        </section >
    );
};

export default CoursesSection;
