import styled from 'styled-components';
import BlurFade from '../ui/blur-fade';
import { ChartNoAxesCombined, Clock, MousePointerClick } from 'lucide-react';
import { PopularJobsList } from '@/Hooks/JobHook';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';





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
};


export default function PopluarJobs() {


    // get popular jobs
    const { data, isLoading, isFetching, isError } = PopularJobsList()


    const getTimeAgo = (postedTime: string) => {
        return formatDistanceToNow(new Date(postedTime), { addSuffix: true });
    };

    return (


        <>


            <div className="px-2 md:px-32 py-16">


                <div className='border-t border-gray-200 py-2 sm:py-10'>

                    <BlurFade delay={0.25} duration={0.5} inView>

                        <h2 className="pl-2 text-3xl font-semibold mb-6 text-center flex items-center justify-center">Popluar Jobs <ChartNoAxesCombined size={26} color='#16A34A' className='ms-2' /></h2>

                        <p className="pl-2 text-slate-500 mb-5 text-center  max-w-xl px-2 sm:px-0 sm:mx-auto">
                            Search all the open positions on the web. Get your personalized job concerning your skill and time
                            Spend your time and settle your life

                        </p>

                    </BlurFade>


                    <BlurFade delay={0.25 * 2} duration={0.5} inView>

                        {

                            isLoading || isError || isFetching ? (

                                // Loader
                                [...Array(3)].map((_, index) => (
                                    <div key={index} className="sm:m-5 mt-10">
                                        <div className="group mx-2 mt-4 grid max-w-7xl grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-6 text-gray-700 shadow sm:mx-auto animate-pulse">
                                            <div className="order-2 col-span-1 mt-4 -ml-14 text-left sm:-order-1 sm:ml-4">
                                                <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                                            </div>

                                            <div className="col-span-9 flex flex-col pr-8 text-left sm:pl-4">
                                                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                                                <div className="h-6 w-48 bg-gray-300 rounded mb-3"></div>
                                                <div className="h-4 w-24 bg-gray-300 rounded flex items-center mb-5"></div>

                                                <div className="mt-5 flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                                    <div className="h-6 w-32 bg-gray-300 rounded"></div>
                                                </div>

                                                {/* Apply Button - Mobile */}
                                                <div className="block md:gap-4 items-end sm:hidden mt-4">
                                                    <div className="h-10 w-24 bg-gray-300 rounded"></div>
                                                </div>
                                            </div>

                                            {/* Apply Button - Desktop */}
                                            <div className="sm:flex md:gap-4 items-end hidden">
                                                <div className="h-10 w-24 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))


                            ) : data && data?.length > 0 ? (

                                data?.map((job: Job, idx: number) => (

                                    <div className="sm:m-5 mt-10" key={idx}>

                                        <div className="group mx-2 mt-4 grid max-w-7xl grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-6 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">

                                            <div className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                                                <div className="group relative h-16 w-16 overflow-hidden rounded-full shadow-lg border border-gray-300">
                                                    <img src={job.company.logo ? job.company.logo : "/Employer-Default.png"} loading='lazy' alt="img" className="h-full w-full object-cover text-gray-700 rounded-full" />
                                                </div>
                                            </div>

                                            <div className="col-span-9 flex flex-col pr-8 text-left sm:pl-4">

                                                <h3 className="text-sm text-gray-600">{job?.company?.company_name.toLocaleUpperCase()}</h3>
                                                <p className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{job?.job_title.toUpperCase()}</p>
                                                <p className="overflow-hidden pr-7 text-sm flex items-center"><Clock size={16} className='me-2 text-green-500' /> posted {getTimeAgo(job?.posted_date)}</p>

                                                <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                                    <div className=""><span className="mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">{job?.job_type}</span></div>
                                                    <div className=""><span className="mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900"> ₹{job?.pay_structure} - {job?.salary_type}</span></div>

                                                </div>

                                                {/* Apply Button On Mobile*/}
                                                <div className="block md:gap-4 items-end sm:hidden mt-4">
                                                    <div>
                                                        <Link to={`/jobdeatils/${job?.id}/${job?.job_type}`}>
                                                            <button
                                                                disabled={job?.applied}
                                                                className={`flex w-full justify-center items-center ${job?.applied
                                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                                                    } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white font-semibold px-5 py-2 rounded-full shadow-sm transition-transform transform ${!job?.applied && 'hover:scale-105'
                                                                    } duration-300 ease-in-out`}
                                                            >
                                                                {job?.applied ? (
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


                                            </div>

                                            {/* Apply Button */}
                                            <div className="sm:flex md:gap-4 items-end hidden">
                                                <div>
                                                    <Link to={`/jobdeatils/${job?.id}/${job?.job_type}`}>
                                                        <button
                                                            disabled={job?.applied}
                                                            className={`flex w-full justify-center items-center ${job?.applied
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                                                } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white font-semibold px-5 py-2 rounded-full shadow-sm transition-transform transform ${!job?.applied && 'hover:scale-105'
                                                                } duration-300 ease-in-out`}
                                                        >
                                                            {job?.applied ? (
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

                                        </div>

                                    </div>

                                ))


                            ) : (

                                <div className='flex justify-center items-center mt-5'>
                                    <h1 className='text-xl font-semibold text-gray-600'>No Jobs Found</h1>
                                </div>
                            )

                        }

                    </BlurFade>


                    <div className='flex justify-center items-center mt-5'>

                        <StyledWrapper>
                            <Link to={'/jobfilter'}>
                                <button>
                                    <p>MoreJobs</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </Link>
                        </StyledWrapper>

                    </div>

                </div>

            </div>


        </>


    )
}



const StyledWrapper = styled.div`
  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  button {
    --primary-color: #111;
    --hovered-color: rgb(22 163 74 / var(--tw-text-opacity, 1));
    position: relative;
    display: flex;
    font-weight: 600;
    font-size: 20px;
    gap: 0.5rem;
    align-items: center;
  }

  button p {
    margin: 0;
    position: relative;
    font-size: 20px;
    color: var(--primary-color);
  }

  button::after {
    position: absolute;
    content: "";
    width: 0;
    left: 0;
    bottom: -7px;
    background: var(--hovered-color);
    height: 2px;
    transition: 0.3s ease-out;
  }

  button p::before {
    position: absolute;
    /*   box-sizing: border-box; */
    content: "MoreJobs";
    width: 0%;
    inset: 0;
    color: var(--hovered-color);
    overflow: hidden;
    transition: 0.3s ease-out;
  }

  button:hover::after {
    width: 100%;
  }

  button:hover p::before {
    width: 100%;
  }

  button:hover svg {
    transform: translateX(4px);
    color: var(--hovered-color);
  }

  button svg {
    color: var(--primary-color);
    transition: 0.2s;
    position: relative;
    width: 15px;
    transition-delay: 0.2s;
  }`;
