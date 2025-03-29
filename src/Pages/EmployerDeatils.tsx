import CompanyOpening from "@/Components/Company/CompanyOpening";
import { Employeers } from "@/Hooks/JobHook";
import { AlertCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





type Country = {
    value: string;
    label: string;
    flag: string;
};


type Company = {
    id: number;
    profile_url: string | null;
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


type Job = {
    id: number;
    job_title: string;
    job_description: string;
    category: string;
    age_requirement_min: number;
    age_requirement_max: number;
    preferred_academic_courses: string;
    pay_structure: string;
    salary_type: string;
    job_location: string | null;
    posted_date: string;
    job_type: string;
    company: number;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
};


type JobData = {
    company: Company;
    logo: string;
    jobs: Job[];
};



export default function EmployerDeatils() {


    // Get Employeers
    const { data, isLoading, isFetching, isError } = Employeers()



    // Get Job ID
    const { id } = useParams<{ id: string }>();



    // TO Set job details
    const [EmployerDetails, setEmployerDetails] = useState<JobData | null>(null)



    // Filter and set job details
    useEffect(() => {

        if (data && id) {

            const matchingJob = data?.find((job: JobData) => job.company.id.toString() === id);

            if (matchingJob) {

                setEmployerDetails(matchingJob);

            }
        }

    }, [data, id]);




    // Scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth', });



    return (

        <>

            <main className="w-full h-auto">


                <div >

                    <div className="relative -z-0">

                        {/* Dark overlay with green tint */}
                        <div className="relative bg-emerald-900/90 overflow-hidden h-[50vh]">

                            {/* Background image */}
                            <div
                                className="absolute inset-0 z-0 bg-[url('/Apply-Job-Img.jpg')] bg-cover bg-no-repeat bg-center opacity-20"
                                aria-hidden="true"
                            />


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



                    {

                        isLoading || isError || isFetching ?


                            <div className="pb-10">

                                {/* Profile Card Skeleton */}
                                <div className="-mt-14 flex flex-col sm:flex-row md:p-8 p-5 justify-between w-[98%] md:w-3/4 m-auto border border-gray-200 shadow-sm bg-white rounded-lg relative top-[-40px] gap-5 sm:gap-0">
                                    <div className="animate-pulse flex flex-col sm:flex-row justify-between w-full">
                                        <div className="flex">
                                            <div className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] bg-gray-200 rounded-full"></div>
                                            <div className="content-center pl-3 gap-y-0.5 flex flex-col">
                                                <div className="w-40 h-6 bg-gray-200 rounded"></div>
                                                <div className="w-64 h-5 bg-gray-200 rounded mt-2"></div>
                                                <div className="w-52 h-5 bg-gray-200 rounded mt-2"></div>
                                                <div className="w-40 h-5 bg-gray-200 rounded mt-2"></div>
                                            </div>
                                        </div>
                                        <div className="flex md:gap-4 gap-3 items-center">
                                            <div>
                                                <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Company Story Skeleton */}
                                <div className="w-full px-3 sm:px-48 mt-8 animate-pulse">
                                    <div className="w-32 h-6 bg-gray-200 rounded mb-6"></div>
                                    <div className="space-y-4">
                                        <div className="w-full h-5 bg-gray-200 rounded"></div>
                                        <div className="w-full h-5 bg-gray-200 rounded"></div>
                                        <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            :

                            <div>


                                {/* Profile card */}
                                <div>

                                    <div className="-mt-24 sm:-mt-14 flex flex-col sm:flex-row  md:p-8 p-5 justify-between w-[95%] md:w-[83%] m-auto border-2 shadow-sm bg-white rounded-lg relative top-[-40px] gap-5 sm:gap-0">

                                        <div className="flex items-center gap-3 flex-col sm:flex-row">

                                            <div className="rounded-full shadow-lg border border-gray-300">
                                                <img
                                                    src={EmployerDetails?.logo ? EmployerDetails?.logo : "/Employer-Default.png"}
                                                    alt="logo"
                                                    loading="lazy"
                                                    className=" md:w-[80px] md:h-[80px] h-[80px]  w-[80px] shadow-lg rounded-full"
                                                />
                                            </div>


                                            <div className="content-center pl-4 gap-y-1 flex flex-col">

                                                <h2 className="font-bold text-md sm:text-xl text-center sm:text-start">{EmployerDetails?.company?.company_name.toLocaleUpperCase()}</h2>

                                                <div className="flex gap-2">
                                                    <i className="fas fa-map-marker-alt pt-1 text-gray-500"></i>
                                                    <p className="text-gray-500 text-center sm:text-start">
                                                        {EmployerDetails?.company?.country.label ||
                                                            EmployerDetails?.company?.state ||
                                                            EmployerDetails?.company?.city ||
                                                            EmployerDetails?.company?.postal_code
                                                            ? `${EmployerDetails?.company?.country.label ?? ""} ${EmployerDetails?.company?.state ?? ""} ${EmployerDetails?.company?.city ?? ""} ${EmployerDetails?.company?.postal_code ?? ""}`.trim()
                                                            : "Not Available"}
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 justify-center sm:justify-start">
                                                    <i className="fas fa-envelope pt-1 text-gray-500"></i>
                                                    <a target="_blank" href={`mailto:${EmployerDetails?.company?.email}`} className="text-gray-500 hover:text-indigo-500 hover:cursor-pointer">{EmployerDetails?.company?.email ? EmployerDetails?.company?.email : "Not Available"}</a>
                                                </div>

                                                <div className="flex gap-2 sm:justify-start justify-center">
                                                    <i className="fas pt-1 fa-phone text-gray-500"></i>
                                                    <a target="_blank" href={`tel:${EmployerDetails?.company?.phone_number}`} className="text-gray-500 hover:text-indigo-500 hover:cursor-pointer">{EmployerDetails?.company?.phone_number ? EmployerDetails?.company?.phone_number : "Not Available"}</a>
                                                </div>

                                            </div>


                                        </div>


                                        <div className="flex md:gap-4 gap-3 items-center sm:justify-start justify-center">
                                            <div>
                                                <a href="#see-jobs">
                                                    <button className="rounded-md shadow-md md:px-4 px-2 py-1 bg-gray-200 text-[#059669] font-bold hover:scale-110 duration-300">
                                                        See Jobs
                                                    </button>
                                                </a>
                                            </div>
                                        </div>


                                    </div>


                                </div>


                                {/* Company story */}
                                <section>

                                    <div className="w-full px-2 sm:px-2 sm:w-[83%] m-auto ">

                                        <div className="">
                                            <h1 className="text-2xl font-semibold text-gray-800 pb-5">
                                                About {EmployerDetails?.company?.company_name}
                                            </h1>

                                            {EmployerDetails?.company?.company_info?.split("\n").map((paragraph, index) => (
                                                <p key={index} className={`text-[1rem] text-gray-500 pb-4 text-justify ${paragraph.trim().endsWith(":") || paragraph.length < 40 ? "font-bold text-gray-800" : ""}`}>
                                                    {paragraph.trim()}
                                                </p>
                                            ))}


                                        </div>

                                    </div>

                                </section>



                                {/* Recent Jobs */}
                                {EmployerDetails && EmployerDetails.jobs && EmployerDetails.jobs.length > 0 ?

                                    <div className="w-full px-2 sm:px-0 sm:w-[83%] m-auto pb-10">

                                        <h1 className="text-2xl font-semibold pb-3 text-gray-800 pt-10 flex items-center">
                                            Recent Posts <Clock size={24} className="inline-block ms-2" />
                                        </h1>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                            {EmployerDetails?.jobs.map((job: Job, index: number) => (

                                                <div id="see-jobs" key={index}>

                                                    <CompanyOpening
                                                        companyname={EmployerDetails?.company?.company_name}
                                                        job_id={job?.id}
                                                        jobtype={job?.job_type}
                                                        posteddate={job?.posted_date}
                                                        postion={job?.job_title}
                                                        salary={job?.pay_structure}
                                                        salary_Type={job?.salary_type}
                                                        logo={EmployerDetails?.logo}
                                                        loaction={job?.country ? job?.country : EmployerDetails?.company?.country?.label}

                                                        key={index} />

                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                    :
                                    <div className="w-full px-2 sm:px-0 sm:w-[83%] m-auto pb-10">

                                        <h1 className="text-2xl font-semibold pb-3 text-gray-800 pt-10 flex items-center">
                                            Recent Posts <Clock size={24} className="inline-block ms-2" />
                                        </h1>


                                        <div className="flex flex-col items-center justify-center bg-gray-50/5 rounded-lg py-10">
                                            <AlertCircle className="w-10 h-10 text-gray-500" />
                                            <p className="mt-2 text-gray-500 font-medium">No Recent Posts</p>
                                        </div>

                                    </div>

                                }

                            </div>
                    }


                </div>


            </main>


        </>



    )
}
