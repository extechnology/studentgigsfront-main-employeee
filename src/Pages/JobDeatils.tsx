import { Briefcase, BriefcaseBusiness, Calendar1, IndianRupee, MapPin, MousePointerClick } from "lucide-react";
import { Link } from "react-router-dom";
import { SingleJobData } from '@/Hooks/JobHook';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



type Country = {
  value: string;
  label: string;
  flag: string;
};

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




export default function JobDeatils() {


  // Get Job ID
  const { id, jobType } = useParams<{ id: string; jobType: string }>();



  // Get Jobs
  const { data, isLoading, isFetching, isError } = SingleJobData(id ?? '', jobType ?? '');



  // TO Set job details
  const [jobDetails, setJobDetails] = useState<Job | null>(null);



  // Filter and set job details
  useEffect(() => {

    if (data && id) {

      setJobDetails(data);

    }

  }, [data, id, jobType]);



  // Scroll to top when page is loaded
  window.scrollTo({ top: 0, behavior: 'smooth', });


  return (


    <>


      <main className="w-full h-auto">


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

          isLoading || isFetching || isError ?


            <div className="w-[95%] md:w-3/4 m-auto border-2 shadow-sm bg-white rounded-lg p-5 md:p-8 -mt-20 relative">

              {/* Header Skeleton */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0 animate-pulse ">
                <div className="flex items-center gap-4">
                  <div className="w-[70px] md:w-[80px] h-[70px] md:h-[80px] bg-gray-300 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-6 w-40 bg-gray-300 rounded" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                    <div className="h-4 w-48 bg-gray-300 rounded" />
                  </div>
                </div>
                <div className="w-32 h-10 bg-gray-300 rounded-full" />
              </div>

              {/* Job Description Skeleton */}
              <div className="mt-8 space-y-4 animate-pulse">
                <div className="h-6 w-56 bg-gray-300 rounded" />
                <div className="h-4 w-40 bg-gray-300 rounded" />
                <div className="h-4 w-48 bg-gray-300 rounded" />
                <div className="h-4 w-64 bg-gray-300 rounded" />
              </div>

              {/* Description Box Skeleton */}
              <div className="mt-8 p-5 bg-white rounded-lg animate-pulse">
                <div className="h-6 w-48 bg-gray-300 rounded mb-4" />
                <div className="h-4 w-full bg-gray-300 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-300 rounded mb-2" />
              </div>
            </div>

            :

            <div>

              {/* Job Deatils */}
              <div>

                <div className="-mt-24 sm:-mt-14 flex flex-col sm:flex-row  md:p-8 p-5 justify-between w-[95%] md:w-3/4 m-auto border-2 shadow-sm bg-white rounded-lg relative top-[-40px] gap-5 sm:gap-0">


                  {/* Profile Deatils */}
                  <div className="flex items-center gap-3 flex-col sm:flex-row">


                    <div className="rounded-full shadow-lg border border-gray-300">
                      <img
                        src={jobDetails?.company?.logo ? jobDetails?.company?.logo : '/Employer-Default.png'}
                        alt="logo"
                        loading="lazy"
                        className=" md:w-[80px] md:h-[80px] w-[70px] h-[70px] shadow-lg rounded-full"
                      />
                    </div>


                    <div className="content-center pl-3">


                      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start sm:justify-between gap-2">

                        <h2 className="font-semibold text-xl text-gray-900 me-3 text-center">{jobDetails?.job_title.toUpperCase()}</h2>

                        <span className="px-3 py-1 bg-emerald-200 text-gray-600 font-bold rounded-full text-sm me-3 w-16 flex">
                          {jobDetails?.job_type}
                        </span>

                        <div className="flex items-center text-gray-600 text-md">

                          <IndianRupee size={16} className="text-emerald-500" />

                          <span className="font-semibold">{jobDetails?.pay_structure} - {jobDetails?.salary_type}</span>

                        </div>

                      </div>


                      <Link to={`/employerdeatils/${jobDetails?.company?.id}`} className="hover:text-emerald-600">
                        <h2 className="font-bold text-md text-gray-700 text-center sm:text-start hover:text-emerald-600">{jobDetails?.company?.company_name.toUpperCase()}</h2>
                      </Link>


                      <div className="flex gap-1">
                        <i className="fas fa-map-marker-alt pt-1 text-gray-700"></i>
                        <p className="text-gray-700">
                          {jobDetails?.job_location}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Apply Button */}
                  <div className="sm:flex md:gap-4 items-end">
                    <div>
                      <Link to={`/applyjob/${id}/${jobType}`}>
                        <button
                          disabled={jobDetails?.applied}
                          className={`flex w-full justify-center items-center ${jobDetails?.applied
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white font-semibold px-5 py-2 rounded-full shadow-sm transition-transform transform ${!jobDetails?.applied && 'hover:scale-105'
                            } duration-300 ease-in-out`}
                        >
                          {jobDetails?.applied ? (
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




              {/* Full Job Discription */}
              <div className="w-full px-3 sm:px-0 sm:w-3/4 m-auto ">

                <div className="">

                  <h1 className="text-2xl font-semibold text-gray-800 pb-5">
                    Full Job Discription
                  </h1>


                  <p className="text-gray-800 font-bold mb-3 flex items-center text-sm sm:text-[1rem]"> <BriefcaseBusiness size={18} className="me-2 text-gray-600" />  Postion : <span className="font-semibold text-gray-500 ms-2">{jobDetails?.job_title.toUpperCase()}</span></p>


                  <p className="text-gray-800 font-bold mb-3 flex items-center text-sm sm:text-[1rem]"><MapPin size={18} className="me-2 text-gray-600" /> Location  : <span className="font-semibold text-gray-500 ms-2">{jobDetails?.job_location}</span>

                  </p>


                  <p className="text-gray-800 font-bold mb-3 flex items-center text-sm sm:text-[1rem]"> <Briefcase size={18} className="me-2 text-gray-600" /> Job Type  : <span className="font-semibold text-gray-500 ms-2">{jobDetails?.job_type}</span></p>


                  <p className="text-gray-800 font-bold mb-3 flex items-center text-sm sm:text-[1rem]"><Calendar1 className="me-2 text-gray-600" size={18} /> Age Preference <span className="font-semibold text-gray-500 ms-2">{jobDetails?.age_requirement_min}yr - {jobDetails?.age_requirement_max}yr</span></p>


                  <p className="text-gray-800 font-bold mb-3 flex items-center text-sm sm:text-[1rem]"> <IndianRupee size={18} className="me-2 text-gray-600" /> Pay: <span className="font-semibold text-gray-500 ms-2">₹{jobDetails?.pay_structure} - {jobDetails?.salary_type}</span></p>


                  {/* About */}
                  <div className="w-full mx-auto bg-white rounded-lg pb-10 pt-5 text-md">
                    <style>
                      {`
    .job-description-content {
      color: #374151;
      line-height: 1.6;
      padding: 0rem;
    }

    .job-description-content h1 {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #111827;
    }

    .job-description-content h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #1F2937;
    }

    .job-description-content h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #374151;
    }

    .job-description-content p {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .job-description-content .section {
      margin-bottom: 2rem;
    }

    .job-description-content ul,
    .job-description-content ol {
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-left: 1.5rem;
    }

    .job-description-content ul li,
    .job-description-content ol li {
      list-style-position: outside;
      padding-left: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .job-description-content ul li {
      list-style-type: disc;
    }

    .job-description-content ol li {
      list-style-type: decimal;
    }

    .job-description-content strong {
      font-weight: 600;
      color: #1F2937;
    }

    .job-description-content .keywords {
      margin-top: 2rem;
      font-size: 0.875rem;
      font-style: italic;
      color: #6B7280;
    }

    .job-description-content div.section + div.section {
      margin-top: 2rem;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .job-description-content {
        padding: 0rem;
      }

      .job-description-content h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
      }

      .job-description-content h2 {
        font-size: 1.25rem;
        margin-top: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
      }

      .job-description-content h3 {
        font-size: 1.125rem;
        margin-top: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }

      .job-description-content ul,
      .job-description-content ol {
        margin-left: 1rem;
      }

      .job-description-content .section {
        margin-bottom: 1.5rem;
      }

      .job-description-content .keywords {
        font-size: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .job-description-content {
        padding: 0.5rem;
        
      }

      .job-description-content h1 {
        font-size: 1.375rem;
        font-weight: 700;
      }

      .job-description-content h2 {
        font-size: 1.125rem;
        font-weight: 700;
      }

      .job-description-content h3 {
        font-size: 1rem;
        font-weight: 700;
      }

      .job-description-content p {
        font-size: 0.875rem;
        text-align: justify;
        hyphens: auto;
        text-justify: inter-word;
        word-spacing: -0.5px;
        max-width: 70ch;
        letter-spacing: 0.2px;
      }

      .job-description-content ul,
      .job-description-content ol {
        margin-left: 0.75rem;
      }

      .job-description-content .keywords {
        font-size: 0.7rem;
      }
    }
  `}
                    </style>

                    <div
                      className="job-description-content prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={jobDetails?.job_description ? { __html: jobDetails.job_description } : undefined}
                    />
                  </div>

                </div>

              </div>

            </div>

        }

      </main>


    </>


  )



}
