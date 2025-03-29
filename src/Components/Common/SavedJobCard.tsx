import { Briefcase, Building, ChevronRight, Clock, MapPin, MousePointerClick, Trash2 } from 'lucide-react'
import { RemoveSavedJobs } from '@/Hooks/JobHook'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


// Job Card Props
interface JobCardProps {

    id: number
    index: number
    job_title: string
    company_name: string
    logo: string | null
    location: string
    postedTime: string
    jobType: string
    applied: boolean

}



export default function SavedJobCard({ id, index, applied, company_name, jobType, job_title, logo, location, postedTime }: JobCardProps) {


    // Calculate time ago
    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(postedTime), { addSuffix: true }));


    useEffect(() => {

        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(new Date(postedTime), { addSuffix: true }));
        }, 60000);

        return () => clearInterval(interval);

    }, [postedTime]);



    // Delete Saved Jobs HOOK
    const { mutate: DeleteSavedJobs } = RemoveSavedJobs()



    // Delete Saved Jobs
    const HandleDelete = (id: number, job_type: string,) => {

        DeleteSavedJobs({ id, job_type }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("Job Removed from Saved Jobs");

                } else {

                    toast.error("Something went wrong please try again");
                    console.log(response)

                }

            }

        })

    }


    return (

        <>

            <div
                key={id}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-md hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fadeIn"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: '0.5s',
                    animationFillMode: 'forwards',
                }}
            >
                <div className="flex items-start">


                    {/* Company logo */}
                    <div className="flex items-start">
                        <img
                            src={logo || "/Employer-Default.png"}
                            alt={company_name}
                            loading='lazy'
                            className="w-14 h-14 rounded-full object-cover mr-4 shadow-md"
                        />
                    </div>

                    {/* Job details */}
                    <div className="flex-grow">

                        <h3 className="font-semibold text-lg text-gray-800">{job_title.toUpperCase()}</h3>

                        <div className="flex flex-wrap gap-y-3 mt-2">

                            <div className="flex items-center text-gray-600 text-sm mr-4">
                                <Building size={16} className="mr-1.5 text-gray-400" />
                                {company_name.toUpperCase()}
                            </div>

                            <div className="flex items-center text-gray-600 text-sm mr-4">
                                <MapPin size={16} className="mr-1.5 text-gray-400" />
                                {location}
                            </div>

                            <div className="flex items-center text-gray-600 text-sm mr-4">
                                <Briefcase size={16} className="mr-1.5 text-gray-400" />
                                {jobType}
                            </div>

                            <div className="flex items-center text-gray-600 text-sm">
                                <Clock size={16} className="mr-1.5 text-gray-400" />
                                {timeAgo}
                            </div>

                        </div>

                        {/* Action buttons visible on larger screens */}
                        <div className="hidden md:flex mt-4 space-x-2">

                            <Link to={`/jobdeatils/${id}/${jobType}`}>

                                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center">
                                    View Details
                                    <ChevronRight size={16} className="ml-1" />
                                </button>

                            </Link>

                            <Link to={`/applyjob/${id}/${jobType}`}>
                                <button
                                    disabled={applied}
                                    className={`flex w-full justify-center items-center text-sm ${applied
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                        } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white font-semibold px-4 py-2 rounded-full shadow-sm transition-transform transform ${!applied && 'hover:scale-105'
                                        } duration-300 ease-in-out`}
                                >
                                    {applied ? (
                                        <>
                                            Applied <span className="ms-2">✓</span>
                                        </>
                                    ) : (
                                        <>
                                            Apply <MousePointerClick size={20} className='ms-2' />
                                        </>
                                    )}
                                </button>
                            </Link>

                        </div>

                    </div>


                    {/* Delete button with animation */}
                    <button
                        onClick={() => HandleDelete(id, jobType)}
                        className="p-3 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-300 transform hover:rotate-12"
                        aria-label="Remove from saved jobs"
                    >
                        <Trash2 size={20} />
                    </button>

                </div>


                {/* Action buttons visible on mobile */}
                <div className="flex md:hidden mt-4 space-x-2 w-full">
                    <button className="flex-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
                        View Details
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                    <button className="flex-1 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
                        Apply Now
                    </button>
                </div>


            </div>

        </>

    )


}
