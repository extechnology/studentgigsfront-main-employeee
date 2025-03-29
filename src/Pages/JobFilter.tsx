import JobCard from '@/Components/Common/JobCard';
import NoJobFound from '@/Components/Loaders/NoJobFound';
import FilterJob from '@/Components/JobFilter/FilterJob';
import { useJobSearch } from '@/Context/JobSearchContext';
import { useAuth } from '@/Context/AuthContext';
import { Link, useLocation } from 'react-router-dom';



// Country types
type Country = {
    value: string;
    label: string;
    flag: string;
};

// Company types
type Company = {
    id: number;
    company_name: string;
    company_info: string;
    logo: string;
    email: string;
    phone_number: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: Country;
    user: number;
};

// Job types
type Job = {
    id: number;
    company: Company;
    job_title: string;
    job_description: string;
    category: string;
    age_requirement_min: number;
    age_requirement_max: number;
    preferred_academic_courses: string;
    pay_structure: string;
    salary_type: string;
    job_location: string;
    posted_date: string;
    job_type: string;
    applied: boolean;
    saved_job: boolean
};





export default function JobFilter() {

    // Location
    const location = useLocation();

    // Auth context
    const { isAuthenticated } = useAuth();


    // Job search
    const { searchResults, isLoading, isError, isFetching, page, setPage, totalPages } = useJobSearch();


    return (


        <>

            <main className="w-full h-auto">


                {/* Top section */}
                <div className="relative -z-40">

                    {/* Dark overlay with green tint */}
                    <div className="relative bg-emerald-900/90 overflow-hidden">

                        {/* Background image */}
                        <div
                            className="absolute inset-0 z-0 bg-[url('/Job-Filter-Bg.jpg')] bg-cover bg-no-repeat bg-center opacity-20"
                            aria-hidden="true"
                        />


                        <div className="relative z-10 px-4 py-28 sm:px-6 lg:px-8 sm:h-[55vh] h-[50v] flex flex-col justify-center maz-w-xl mx-auto">

                            {/* Main heading */}
                            <p className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl mb-8 mt-5">
                                “Your profile is your gateway to independence and practical learning. Build it to showcase your skills, explore opportunities, and prepare for the challenges of tomorrow.”
                            </p>

                        </div>

                        {/* Curved bottom edge */}
                        <div className="absolute bottom-0 left-0 right-0">
                            <svg
                                viewBox="0 0 1440 120"
                                className="w-full h-[60px] fill-white"
                                preserveAspectRatio="none"
                            >
                                <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
                            </svg>
                        </div>

                    </div>

                </div>


                {/* search filter */}
                <FilterJob />


                {/* Job Card */}
                <section className='px-2 md:px-32 py-8'>

                    {isLoading || isFetching || isError ? (

                        // Show loading skeleton
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {Array.from({ length: 6 }).map((_, index) => (

                                <div key={index} className="bg-white rounded-lg p-6 sm:shadow-sm shadow-md border border-gray-200 hover:shadow-md transition-shadow animate-pulse">

                                    {/* Header - Position & Time */}
                                    <div className="mb-4">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        </div>
                                    </div>

                                    {/* Job Type & Salary */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                    </div>

                                    {/* Position & Location */}
                                    <div className="flex items-center gap-4 border-t pt-7 border-gray-200/55">
                                        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="h-5 bg-gray-200 rounded w-32"></div>
                                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    ) : searchResults?.data && searchResults?.data.length > 0 ? (

                        <>

                            <div className='grid sm:grid-cols-3 gap-4 grid-cols-1'>
                                {searchResults.data.map((item: Job, index: number) => (
                                    <JobCard
                                        company={item?.company?.company_name}
                                        applied={item?.applied}
                                        saved={item?.saved_job}
                                        salaryType={item?.salary_type}
                                        jobType={item?.job_type}
                                        location={item?.job_location}
                                        logo={item?.company?.logo}
                                        position={item?.job_title}
                                        postedTime={item?.posted_date}
                                        salary={item?.pay_structure}
                                        id={item?.id}
                                        employer_id={item?.company?.id}
                                        key={index}
                                    />
                                ))}
                            </div>

                            {
                                !isAuthenticated &&

                                <div className='flex justify-center mt-8 '>
                                    <Link to={'/auth'} state={{ from: location }}>
                                        <button className='hover:cursor-pointer group relative px-8 py-3 text-white bg-gradient-to-br from-green-500 to-green-600 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.3)] flex items-center gap-3 overflow-hidden'>
                                            <span className="relative z-10">Load More Jobs</span>
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1s_forwards] z-20" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                                        </button>
                                    </Link>
                                </div>
                            }


                            {/* Pagination */}
                            <div className="flex justify-center mt-6">
                                <button
                                    className={`px-4 py-2 mx-1 text-white bg-gray-600 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                                    onClick={() => { setPage(page - 1), window.scrollTo({ top: 0, behavior: 'smooth', }); }}
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 mx-2 text-gray-700">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    className={`px-4 py-2 mx-1 text-white bg-green-600 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                    onClick={() => { setPage(page + 1), window.scrollTo({ top: 0, behavior: 'smooth', }); }}
                                    disabled={page === totalPages}
                                >
                                    Next
                                </button>
                            </div>

                        </>

                    ) : (

                        <NoJobFound />
                    )}

                </section>


            </main >


        </>


    )

}
