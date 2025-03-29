import { BriefcaseBusiness, Building2, FileText, GraduationCap, GraduationCapIcon, Laptop, Lightbulb, Medal, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { GetPersonalInfo } from "@/Hooks/UserProfile";
import PersonalInfoLoader from "@/Components/Loaders/PersonalInfoLoader";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoEducation from "@/Components/Loaders/NoEducation";
import NoAboutMe from "@/Components/Loaders/NoAbout";
import NoTechnicalSkills from "@/Components/Loaders/NoTech";
import NoSoftSkills from "@/Components/Loaders/NoSoft";
import NoExperience from "@/Components/Loaders/NoExp";
import ResumeViewer from "@/Components/Common/ResumeViewer";
import { useAuth } from "@/Context/AuthContext";


interface Profile {
    cover_photo: string | null;
    profile_pic: string | null;
}

interface Language {
    id: number;
    language: string;
    language_level: string;
    employee: number;
}

interface TechnicalSkill {
    id: number;
    technical_skill: string;
    technical_level: string;
    employee: number;
}

interface SoftSkill {
    id: number;
    soft_skill: string;
    employee: number;
}

interface Education {
    id: number;
    field_of_study: string;
    name_of_institution: string;
    expected_graduation_year: string;
    academic_level: string;
    achievement_name: string;
    employee: number;
}

interface WorkPreference {
    id: number;
    interested_job_type: string;
    expected_salary_range: string;
    availability: string;
    transportation_availability: string;
    employee: number;
}

interface PreferredJobCategory {
    id: number;
    preferred_job_category: string;
    employee: number;
}

interface Experience {
    id: number;
    exp_company_name: string;
    exp_job_title: string;
    exp_start_date: string;
    exp_end_date: string;
    exp_working: boolean;
    employee: number;
}

interface AdditionalInformation {
    employee_resume: string;
    hobbies_or_interests: string | null;
    reference_or_testimonials: string | null;
}

interface Country {
    value: string;
    label: string;
    flag: string;
}

interface PersonalInfo {
    id: number;
    profile: Profile;
    languages: Language[];
    technical_skills: TechnicalSkill[];
    soft_skills: SoftSkill[];
    educations: Education[];
    certifications: any[];
    work_preferences: WorkPreference[];
    preferred_job_categories: PreferredJobCategory[];
    experiences: Experience[];
    additional_information: AdditionalInformation;
    name: string;
    profile_photo: string | null;
    email: string;
    phone: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: Country;
    preferred_work_location: string;
    available_work_hours: number;
    available_working_periods_start_date: string;
    available_working_periods_end_date: string;
    portfolio: string;
    user: number;
    about: string;
    job_title: string;
}








export default function UserProfile() {


    // Plan Details
    const { plan, isPlanExpired } = useAuth()


    // To open and close the modal
    const [isOpen, setIsOpen] = useState(false);


    // Get User Personal Information
    const { data, isLoading, isError, isFetching, isSuccess } = GetPersonalInfo()


    // User Data
    const [UserData, SetUserData] = useState<PersonalInfo | null>(null)


    useEffect(() => {

        if (data && isSuccess) {

            const SelectedInfo = data[0]

            SetUserData(SelectedInfo)

        }

    }, [data])



    // Scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth', });



    // Calculate Duration
    const calculateDuration = (startDate: any, endDate: any) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) return `${remainingMonths} months`;
        if (remainingMonths === 0) return `${years} yr${years > 1 ? 's' : ''}`;
        return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} months`;
    };


    // Format Date
    const formatDate = (date: any) => {
        if (!date) return 'Present';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };



    return (


        <>

            <main className="pt-20 sm:pt-12">


                <div className="">


                    <div className=" w-full m-auto px-1 sm:px-16 md:px-5 lg:px-14">

                        {


                            isLoading || isError || isFetching ?


                                <PersonalInfoLoader />


                                :

                                <div>

                                    <section className="pt-10">


                                        {/* Banner Image */}
                                        <div className="relative group h-[20vh] md:h-[25vh] lg:h-[40vh] rounded-lg  md:rounded-2xl lg:rounded-3xl">
                                            <img
                                                src={UserData?.profile?.cover_photo || "/Cover-def.jpg"}
                                                alt="banner"
                                                loading="lazy"
                                                className="w-full h-full object-cover rounded-lg md:rounded-2xl lg:rounded-3xl"
                                            />

                                        </div>



                                        {/* Profile Image */}
                                        <div className="flex justify-between -mt-7 sm:-mt-10 sm:ms-8 sm:me-10 ms-2">

                                            <div className="flex justify-between space-x-2">

                                                <div className="flex items-center gap-4">

                                                    <div className="relative group">

                                                        {/* Shimmer border effect for premium users */}
                                                        {!isPlanExpired &&  plan?.premium_profile_badge.toLowerCase() === "yes" && (
                                                            <div className="absolute inset-0 rounded-full border-shimmer"></div>
                                                        )}

                                                        <div className="relative w-24 h-24 md:w-32 md:h-32">

                                                            <img
                                                                src={UserData?.profile?.profile_pic ?? "/Profile-deaf.jpg"}
                                                                alt="profile"
                                                                loading="lazy"
                                                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                                            />

                                                            {/* Premium Badge */}
                                                            {!isPlanExpired && plan?.premium_profile_badge.toLowerCase() === "yes" && (

                                                                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 overflow-hidden rounded-full shadow-lg border-2 border-white">
                                                                    <div className="premium-badge bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold py-1 px-3 flex items-center gap-1 relative overflow-hidden">
                                                                        {/* Shimmer effect overlay */}
                                                                        <div className="shimmer-effect"></div>

                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                                                                        </svg>
                                                                        PREMIUM
                                                                    </div>
                                                                </div>

                                                            )}

                                                        </div>

                                                    </div>

                                                </div>



                                                <div className="md:pt-12 pt-9">
                                                    <h1 className="font-semibold text-md md:text-lg">{UserData?.name?.toUpperCase()}</h1>
                                                    <p className="font-[1rem] text-md md:text-lg text-gray-400">
                                                        {UserData?.job_title}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="flex sm:mt-12 mt-10 pl-4 me-4">
                                                <Link to={'/settings'}>
                                                    <Settings size={46} className="text-black bg-green-100 rounded-full p-2 sm:h-12 sm:w-12 h-10 w-10" />
                                                </Link>
                                            </div>


                                        </div>

                                    </section>



                                    <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-9 px-2 sm:px-10">


                                        {/* About */}
                                        <div className="pt-10">

                                            <div className=" ">


                                                <h3 className="text-2xl  font-semibold capitalize text-gray-900 pb-5">
                                                    About Me
                                                </h3>

                                                {/* About User */}
                                                <p className="text-md sm:text-[1.1rem] font-[1rem] text-gray-500 leading-relaxed text-justify">
                                                    {UserData?.about ? UserData?.about : <NoAboutMe />}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Personal Details */}
                                        <div className="md:p-4">

                                            <div className="max-w-full md:w-full lg:max-w-2xl mx-auto">

                                                <div className="shadow-sm bg-gray-50 rounded-lg p-4 md:p-6">

                                                    <h1 className="text-lg font-bold text-gray-500 mb-4">
                                                        Personal Details:
                                                    </h1>

                                                    <table className="w-full text-sm text-left text-gray-600 font-semibold">


                                                        <tbody>

                                                            <tr className="border-b">

                                                                <th
                                                                    scope="row"
                                                                    className="px-4 py-2 font-medium whitespace-nowrap text-start block md:table-cell"
                                                                >
                                                                    <i className="fa-solid fa-envelope mr-2"></i> Contact
                                                                    Email:
                                                                </th>
                                                                <td className="px-4 py-2 text-gray-800 block md:table-cell">
                                                                    {UserData?.email ? UserData?.email : "None"}
                                                                </td>
                                                            </tr>


                                                            <tr className="border-b">
                                                                <th
                                                                    scope="row"
                                                                    className="px-4 py-2 font-medium whitespace-nowrap text-start block md:table-cell"
                                                                >
                                                                    <i className="fa-solid fa-phone mr-2"></i> Phone Number:
                                                                </th>
                                                                <td className="px-4 py-2 text-gray-800 block md:table-cell">
                                                                    {UserData?.phone ? UserData?.phone : "None"}
                                                                </td>
                                                            </tr>


                                                            <tr className="border-b">
                                                                <th
                                                                    scope="row"
                                                                    className="px-4 py-2 font-medium whitespace-nowrap text-start block md:table-cell"
                                                                >
                                                                    <i className="fa-solid fa-location-crosshairs mr-2"></i>{" "}
                                                                    Preferred Work Location (City/Area):
                                                                </th>
                                                                <td className="px-4 py-2 text-gray-800 block md:table-cell">
                                                                    {UserData?.preferred_work_location ? UserData?.preferred_work_location : "None"}
                                                                </td>
                                                            </tr>


                                                            <tr className="border-b">
                                                                <th
                                                                    scope="row"
                                                                    className="px-4 py-2 font-medium whitespace-nowrap text-start block md:table-cell"
                                                                >
                                                                    <i className="fa-solid fa-clock mr-2"></i> Available
                                                                    Work Hours:
                                                                </th>
                                                                <td className="px-4 py-2 text-gray-800 block md:table-cell">
                                                                    {UserData?.available_work_hours ? ` ${UserData?.available_work_hours} Hrs` : "None"}
                                                                </td>
                                                            </tr>


                                                            <tr className="border-b">
                                                                <th
                                                                    scope="row"
                                                                    className="px-4 py-2 font-medium whitespace-nowrap text-start block md:table-cell"
                                                                >
                                                                    <i className="fa-solid fa-language mr-2"></i> Languages
                                                                    Known:
                                                                </th>

                                                                <td className="py-2 px-4 text-gray-800 block md:table-cell">

                                                                    {
                                                                        UserData?.languages && UserData?.languages.length > 0 ?

                                                                            UserData?.languages?.map((item: any) => item.language).join(", ")

                                                                            : "None"

                                                                    }

                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                    </table>

                                                    {UserData?.additional_information?.employee_resume &&

                                                        <div className="w-full flex items-center justify-center py-4">

                                                            <button onClick={() => { setIsOpen(true) }} className="font-bold text-md flex items-center justify-center w-52 hover:cursor-pointer bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                                                                <FileText size={24} className="mr-2" />  Download Cv
                                                            </button>

                                                        </div>

                                                    }

                                                </div>
                                            </div>
                                        </div>


                                    </section>



                                    {/* Skills */}
                                    <section className="w-full py-4 px-2 sm:px-10">

                                        <h1 className="text-2xl pt-3 pb-5 pl-2 text-start font-semibold text-gray-900 flex items-center">
                                            Technical Skills <Laptop className="inline-block ml-2" size={28} />
                                        </h1>

                                        <div className="flex flex-wrap justify-start">


                                            {

                                                UserData?.technical_skills && UserData?.technical_skills.length > 0 ?


                                                    UserData?.technical_skills?.map((skill: any, index: number) => {
                                                        // Convert skill level to percentage
                                                        const skillLevels: { [key: string]: number } = {
                                                            Beginner: 25,
                                                            Intermediate: 50,
                                                            Advanced: 75,
                                                            Expert: 100,
                                                        };
                                                        const skillPercentage = skillLevels[skill.technical_level] || 50; // Default to 50%

                                                        return (
                                                            <div key={index} className="w-full md:w-1/2 xl:w-1/3 mb-5 px-2">

                                                                <div className="flex justify-between mb-1">
                                                                    <span className="text-base font-medium text-gray-400">
                                                                        {skill.technical_skill}
                                                                    </span>
                                                                    <span className="text-sm font-medium text-gray-400">{skillPercentage}%</span>
                                                                </div>

                                                                <div className="w-full bg-gray-200 rounded-full">
                                                                    <div
                                                                        className="bg-[#059669] h-2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                                        style={{ width: `${skillPercentage}%` }}
                                                                    ></div>
                                                                </div>

                                                            </div>
                                                        );
                                                    })

                                                    :

                                                    <NoTechnicalSkills />

                                            }
                                        </div>

                                    </section>




                                    {/* Soft Skills */}
                                    <section className="w-full py-10 px-2 sm:px-10">

                                        <h1 className="text-2xl pt-3 pb-5 pl-2 text-start font-semibold text-gray-900 flex items-center">
                                            Soft Skills <Lightbulb className="inline-block ml-2" size={28} />
                                        </h1>

                                        <div className="flex flex-wrap gap-2">
                                            {UserData?.soft_skills && UserData?.soft_skills.length > 0 ? (
                                                UserData.soft_skills.map((skill: any, index: number) => (
                                                    <span key={index} className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                                                        {skill.soft_skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <NoSoftSkills />
                                            )}
                                        </div>

                                    </section>



                                    {/* Experience */}
                                    <section className="w-full pb-8 sm:px-10 px-2 py-10">

                                        <h1 className="text-2xl py-3 pl-2 text-start font-semibold text-gray-900 flex items-center">
                                            Experience <BriefcaseBusiness size={28} className="ml-2" />
                                        </h1>


                                        {
                                            UserData?.experiences && UserData.experiences.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-10">
                                                    {UserData?.experiences.map((item: any, index: number) => (
                                                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center" key={index}>
                                                            {/* Company Logo */}
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full"
                                                                    src="/Exp-Deaf.png"
                                                                    alt="company-logo"
                                                                    loading="lazy"
                                                                />
                                                            </div>

                                                            {/* Job Details */}
                                                            <div className="w-full">
                                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                                    <h1 className="text-lg sm:text-xl text-gray-900 font-semibold">
                                                                        {item?.exp_job_title}
                                                                    </h1>

                                                                    <p className="text-gray-700 text-md sm:text-base font-medium">
                                                                        <span>{formatDate(item?.exp_start_date)} -{" "}</span>
                                                                        <span>{item?.exp_working ? "Present" : formatDate(item?.exp_end_date)}</span>
                                                                        <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 text-sm sm:text-sm rounded-md">
                                                                            {calculateDuration(item?.exp_start_date, item?.exp_end_date)}
                                                                        </span>
                                                                    </p>
                                                                </div>

                                                                <p className="font-semibold text-indigo-500 text-md sm:text-base">
                                                                    {item?.exp_company_name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (

                                                <NoExperience />
                                            )
                                        }

                                    </section>




                                    {/* Education */}
                                    <div className="w-full max-w-7xl mx-auto py-0 sm:py-6 px-0 sm:px-0 mb-10">

                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 px-2 flex items-center">
                                            Educational Qualifications <GraduationCapIcon size={28} className="ml-2" />
                                        </h2>

                                        <AnimatePresence>

                                            {UserData?.educations && UserData.educations.length > 0 ?

                                                <div className="space-y-4 sm:space-y-8">

                                                    {UserData?.educations.map((item: any) => (
                                                        <motion.div
                                                            key={item.id}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="group relative border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50 transition-all duration-300"
                                                        >
                                                            <div className="px-3 py-4 sm:px-6 sm:py-8">
                                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
                                                                    {/* Left Column - Year */}
                                                                    <div className="sm:w-24 pt-1">
                                                                        <span className="text-sm sm:text-md font-medium text-gray-500">
                                                                            {item.expected_graduation_year}
                                                                        </span>
                                                                    </div>

                                                                    {/* Middle Column - Main Content */}
                                                                    <div className="flex-1 space-y-3">
                                                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                                            <div className="flex items-center gap-2">
                                                                                <GraduationCap className="h-5 w-8 sm:h-5 sm:w-5 text-blue-500" />
                                                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                                                    {item.name_of_institution}
                                                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs sm:text-sm font-semibold text-blue-700 ms-2">
                                                                                        {item.academic_level}
                                                                                    </span>
                                                                                </h3>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                                <Building2 className="h-4 w-4" />
                                                                                <span className="text-xs sm:text-sm">{item.field_of_study}</span>
                                                                            </div>

                                                                            {item.achievement_name && (
                                                                                <div className="flex items-start gap-2 text-gray-600">
                                                                                    <Medal className="h-4 w-4 mt-0.5 text-yellow-500" />
                                                                                    <span className="text-xs sm:text-sm">
                                                                                        {item.achievement_name.replace(/,/g, ', ')}
                                                                                    </span>
                                                                                </div>

                                                                            )}
                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>

                                                            {/* Hover line indicator */}
                                                            <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-500 opacity-100 transition-all duration-200" />

                                                        </motion.div>
                                                    ))}
                                                </div>

                                                :

                                                <NoEducation />

                                            }

                                        </AnimatePresence>

                                    </div>


                                </div>
                        }

                    </div>


                </div>

                <ResumeViewer isOpen={isOpen} onRequestClose={() => setIsOpen(false)} resumeUrl={UserData?.additional_information?.employee_resume ?? null} />

            </main >


        </>


    )
}


