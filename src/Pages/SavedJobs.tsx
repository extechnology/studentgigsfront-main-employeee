import { useState } from 'react';
import { Bookmark, Search, X, } from 'lucide-react';
import { SavedJobs } from '@/Hooks/JobHook';
import SavedJobCard from '@/Components/Common/SavedJobCard';
import SavedjobLoader from '@/Components/Loaders/SavedjobLoader';



// Type definitions
type Company = {
    id: number;
    company_name: string;
    company_info: string;
    logo: string | null;
    email: string;
    phone_number: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string | null;
    user: number;
};

type Job = {
    id: number;
    company: Company;
    applied: boolean;
    total_applied: number;
    saved_job: boolean;
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
};



const SavedJobsPage = () => {


    // Search term
    const [searchTerm, setSearchTerm] = useState('');


    // Saved Jobs Data
    const { data, isLoading, isError, isFetching } = SavedJobs();


    // Filtered jobs based on search and filter
    const filteredJobs = data?.filter((job: Job) => {

        const matchesSearch = job?.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) || job?.company?.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch

    });

    window.scrollTo({ top: 0, behavior: 'smooth', });

    return (


        <div className="max-w-7xl mx-auto pt-24 pb-16 min-h-screen font-sans">



            {/* Header with animated gradient */}
            <div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-blue-600 to-violet-600 text-white p-6 shadow-lg">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 flex items-center">
                        <Bookmark className="mr-3" size={28} />
                        Saved Jobs
                    </h1>
                    <p className="text-blue-100">Keep track of opportunities that interest you</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute top-0 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            </div>



            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search saved jobs..."
                        className="pl-12 pr-4 py-3.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-300 hover:shadow-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                            onClick={() => setSearchTerm('')}
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

            </div>



            {/* Empty state */}
            {data?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="relative inline-block">
                        <div className="absolute animate-ping opacity-75 -inset-1 rounded-full bg-blue-100"></div>
                        <Bookmark className="relative mx-auto text-blue-500" size={64} />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-gray-700">No saved jobs</h2>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">When you save jobs you're interested in, they'll appear here for easy access.</p>
                </div>
            )}



            {isLoading || isFetching || isError ? (

                // Loader
                <SavedjobLoader />


            ) : data && filteredJobs?.length > 0 && (


                // Job cards
                <div className="grid gap-4">

                    {filteredJobs.map((job: Job, index: number) => (

                        <SavedJobCard key={job?.id}
                            index={index}
                            id={job?.id}
                            company_name={job?.company?.company_name}
                            jobType={job?.job_type}
                            job_title={job?.job_title}
                            location={job?.job_location}
                            logo={job?.company?.logo}
                            postedTime={job?.posted_date}
                            applied={job?.applied}
                        />

                    ))}

                </div>

            )}


            {/* No results state with animation */}
            {data?.length > 0 && filteredJobs?.length === 0 && (

                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="relative inline-block animate-bounce">
                        <Search className="mx-auto text-blue-300" size={48} />
                    </div>
                    <h2 className="mt-6 text-xl font-medium text-gray-700">No matching jobs found for "{searchTerm.toUpperCase()}"</h2>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchTerm(''); }}
                        className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                        Clear Search
                    </button>
                </div>
            )}



            {/* CSS for animation keyframes */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation-name: fadeIn;
          }
        `}
            </style>
        </div>
    );
};

export default SavedJobsPage;