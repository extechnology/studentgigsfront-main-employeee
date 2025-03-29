




// type Country = {
//     value: string;
//     label: string;
//     flag: string;
// };

// type Company = {
//     id: number;
//     profile_url: string | null;
//     company_name: string;
//     company_info: string;
//     logo: string;
//     email: string;
//     phone_number: string;
//     street_address: string;
//     city: string;
//     state: string;
//     postal_code: string;
//     country: Country;
//     user: number;
// };

// type Job = {
//     id: number;
//     job_title: string;
//     job_description: string;
//     category: string;
//     age_requirement_min: number;
//     age_requirement_max: number;
//     preferred_academic_courses: string;
//     pay_structure: string;
//     salary_type: string;
//     job_location: string | null;
//     posted_date: string;
//     job_type: string;
//     company: number;
// };

// type JobData = {
//     company: Company;
//     logo: string;
//     jobs: Job[];
// };




export default function EmployerList() {

    // Scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth', });


    // TO Set job details
    // const [jobDetails, setJobDetails] = useState<JobData | null>(null);


    // Get Employeer data
    // const { data } = Employeers()


    return (



        <>

            <main className="w-full h-auto">

                <div className="relative -z-0">

                    {/* Dark overlay with green tint */}
                    <div className="relative bg-emerald-900/90 overflow-hidden">

                        {/* Background image */}
                        <div
                            className="absolute inset-0 z-0 bg-[url('https://www.pct2u.com/wp-content/uploads/2014/07/happy-people.jpg')] bg-cover bg-no-repeat bg-center opacity-20"
                            aria-hidden="true"
                        />


                        <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8 sm:h-[55vh] h-[50v] flex flex-col justify-center">

                            {/* Main heading */}
                            <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-4xl mb-8 mt-8">
                                Employers / Companies
                            </h1>

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



                {/* Card */}
                <section className="px-2 md:px-36 py-10 sm:py-20">


                    <div className="grid sm:grid-cols-4 sm:gap-14 grid-cols-1 gap-10">

                        {Array.from({ length: 12 }, (_, index) => (


                            // <CompanyCard key={index}/>

                            <div key={index}>

                            </div>

                        ))}

                    </div>

                </section>



            </main >


        </>



    )
}
