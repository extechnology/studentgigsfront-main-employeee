import { Clock, IndianRupee, MapPin, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveSavedJobs, SaveSavedJobs } from '@/Hooks/JobHook';
import { useAuth } from '@/Context/AuthContext';
import toast from 'react-hot-toast';

// Job Crad Props
interface JobCardProps {
    company: string;
    logo: string;
    postedTime: string;
    jobType: string;
    salary: string;
    position: string;
    location: string;
    salaryType: string;
    id: number
    applied: boolean
    saved: boolean
    employer_id: number
}


export default function JobCard({ id, applied, saved, employer_id, salaryType, company, logo, postedTime, jobType, salary, position, location }: JobCardProps) {



    // Calculate time ago
    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(postedTime), { addSuffix: true }));

    useEffect(() => {

        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(new Date(postedTime), { addSuffix: true }));
        }, 60000);

        return () => clearInterval(interval);

    }, [postedTime]);


    // Remove Saved Job
    const { mutate: DeleteSavedJob, isPending: DeletePending } = RemoveSavedJobs()


    // Save Job
    const { mutate: SaveJob, isPending: SavePending } = SaveSavedJobs()



    // Auth context
    const { isAuthenticated, isPlanExpired, plan } = useAuth()



    // Navigate
    const navigate = useNavigate()



    // Handle Saved Jobs
    const HandleSavedJobs = (id: number, job_type: string, Saved: boolean) => {

        if (isAuthenticated && !isPlanExpired && plan?.saved_jobs.toLowerCase() === "yes") {

            if (Saved) {

                DeleteSavedJob({ id, job_type }, {

                    onSuccess: (response) => {

                        if (response.status >= 200 && response.status < 300) {

                            toast.success("Job Removed from Saved Jobs");

                        } else {

                            toast.error("Something went wrong please try again");
                            console.log(response)

                        }

                    }

                })

            } else {

                const formData = new FormData()

                formData.append("job_id", id.toString())
                formData.append("job_type", job_type)

                SaveJob({ formData: formData }, {

                    onSuccess: (response) => {

                        if (response.status >= 200 && response.status < 300) {

                            toast.success("Job Saved Successfully");

                        } else {

                            toast.error("Something went wrong please try again");
                            console.log(response)

                        }

                    }
                })

            }

        } else {

            if (!isAuthenticated) {
                toast.error("Please login to save jobs");
                navigate("/auth");
            } else if (isPlanExpired) {
                toast.error("Your plan has expired. Renew to save jobs");
                navigate("/plans");
            } else if (plan?.saved_jobs.toLowerCase() !== "yes") {
                toast.error("Your current plan does not allow saving jobs Upgrade to save jobs");
                navigate("/plans");
            }

        }

    }







    return (

        <>

            <section>


                <div className="bg-white rounded-lg p-6 sm:shadow-sm shadow-md border border-gray-200 hover:shadow-md transition-shadow">



                    {/* Header - Job Title & Time */}
                    <div className="block justify-between items-center mb-4">

                        <div className='flex justify-between items-center'>

                            <h3 className="text-lg font-semibold text-gray-900">{position.toUpperCase()}</h3>

                            <button onClick={() => { HandleSavedJobs(id, jobType, saved) }} disabled={DeletePending || SavePending}>

                                {DeletePending || SavePending ? (
                                    <Loader2 className="animate-spin text-gray-400" />
                                ) : saved ? (
                                    <BookmarkCheck className="text-green-400 fill-transparent" />
                                ) : (
                                    <Bookmark className="text-gray-600" />
                                )}

                            </button>

                        </div>

                        <div className="flex items-center text-gray-600 text-sm py-3">
                            <Clock size={16} className="mr-1 text-green-500 font-semibold" />
                            <span>{timeAgo}</span>
                        </div>

                    </div>

                    <Link to={`/jobdeatils/${id}/${jobType}`}>

                        {/* Job Type & Salary */}
                        <div className="flex justify-between items-center mb-6">

                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-semibold text-sm">
                                {jobType}
                            </span>

                            <div className="flex items-center text-gray-500 text-sm sm:text-[0.9rem] font-medium">
                                <IndianRupee size={16} className="text-emerald-500 " />
                                <span>{salary} - {salaryType}</span>
                            </div>

                        </div>

                        <p className={applied ? 'text-green-600 text-sm' : 'text-gray-400 text-sm'}>
                            {applied ? 'You have already applied ✓' : 'Not applied yet'}
                        </p>

                    </Link>

                    {/* Position & Location */}
                    <div className="flex items-center gap-4 border-t pt-7 border-gray-200/55">

                        <div className="w-14 h-14  overflow-hidden shadow-lg  border border-gray-300 rounded-full">
                            <img
                                src={logo ? logo : '/Employer-Default.png'}
                                alt={company}
                                loading='lazy'
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <div>
                            <Link to={`/employerdeatils/${employer_id}`}>
                                <h4 className="font-semibold text-gray-900 mb-1 text-md hover:text-green-600 hover:cursor-pointer">{company.toUpperCase()}</h4>
                            </Link>
                            <span className="text-gray-500 flex items-center text-sm"><MapPin size={16} className='mr-1' /> {location}</span>
                        </div>

                    </div>

                </div>


            </section>



        </>



    )
}
