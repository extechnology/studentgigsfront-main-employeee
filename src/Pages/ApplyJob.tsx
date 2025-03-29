import { useEffect, useState } from 'react';
import {
    Upload,
    FileText,
    Pencil,
    CheckCircle,
    Building2,
    MapPin,
    Clock,
} from 'lucide-react';
import { SingleJobData } from '@/Hooks/JobHook';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPersonalInfo } from '@/Hooks/UserProfile';
import { ApplyJob } from '@/Hooks/JobHook';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useAuth } from '@/Context/AuthContext';

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

};



const JobApplicationForm = () => {


    const Navigate = useNavigate()


    // Get Plans 
    const { isPlanExpired, usage } = useAuth()


    // Get Job ID
    const { id, jobType } = useParams<{ id: string; jobType: string }>();


    const [resumeUrl, setResumeUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    // Apply Job
    const { mutate: ApplyJobMutate } = ApplyJob();



    // Get Jobs
    const { data, isLoading, isFetching, isError } = SingleJobData(id ?? '', jobType ?? '');



    // Get User Personal Information
    const { data: user, isSuccess, isLoading: userLoading, isFetching: userFetching, isError: userError } = GetPersonalInfo()



    // TO Set job details
    const [jobDetails, setJobDetails] = useState<Job | null>(null);



    // Filter and set job details
    useEffect(() => {

        if (data && id) {

            setJobDetails(data);

        }

    }, [data, id, jobType]);



    // Set Resume Url on load
    useEffect(() => {

        if (user && isSuccess) {

            const SelectedInfo = user[0]

            setResumeUrl(SelectedInfo?.additional_information?.employee_resume ? SelectedInfo?.additional_information?.employee_resume : '')

        }

    }, [data, user])



    // Handle Resume Upload
    const handleResumeUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {

            // Check if the file is a PDF
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed.");
                return;
            }

            // Check if the file size is less than 2MB
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                return;
            }

            const tempUrl = URL.createObjectURL(file);
            setResumeUrl(tempUrl);
            setIsEditing(false);
        }
    };



    // Handle Submit
    const handleSubmit = (e: any) => {

        e.preventDefault();

        if (!isPlanExpired && usage?.job_limit) {

            const formdata = new FormData()

            formdata.append("resume", resumeUrl ? resumeUrl : '')
            formdata.append("job_id", id ? id : '')
            formdata.append("job_type", jobDetails?.job_type ? jobDetails?.job_type : '')


            ApplyJobMutate({ formData: formdata }, {

                onSuccess: (response) => {

                    if (response.status >= 200 && response.status < 300) {

                        toast.success("Application Sent Successfully");
                        Navigate('/jobapplysuccess')
                        handleClick()
                        window.scrollTo({ top: 0, behavior: 'smooth', });

                    }
                    else {

                        toast.error("Something went wrong. Please try again.");

                    }

                }

            })

        } else {

            const handlePlanRedirect = (message: string) => {
                toast.error(message, { duration: 6000 });
                Navigate('/plans');
            };

            if (isPlanExpired) {
                handlePlanRedirect("Your plan has expired. Please subscribe to continue.");
            } else if (!usage?.job_limit) {
                handlePlanRedirect("You have reached your job limit. Please upgrade your plan to continue.");
            }

        }

    }



    // Confetti
    const handleClick = () => {

        const end = Date.now() + 5 * 1000; // display for 4 seconds 
        const colors = ["#6a5acd", "#ff6b81", "#f4a261", "#e9c46a"];


        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };


    window.scrollTo({ top: 0, behavior: 'smooth', });

    return (


        <div className="min-h-screen to-white p-0 sm:py-3 mt-24 sm:mt-16 bg-slate-50/10">

            {

                isLoading || isFetching || isError ? (


                    <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-100 animate-pulse">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
                            <div className="h-8 w-3/4 bg-gray-300 rounded-md mt-2"></div>
                            <div className="mt-4 flex flex-wrap gap-4">
                                <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
                                <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="border-2 border-dashed border-green-200 rounded-xl p-6 bg-green-50/50">
                            <div className="h-6 w-40 bg-gray-300 rounded-md mb-4"></div>
                            <div className="h-40 bg-gray-300 rounded-md"></div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
                        </div>
                    </div>


                ) : (


                    <div className="w-full max-w-4xl mx-auto">

                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-green-100">

                            <div className="mb-8">

                                <span className="text-green-600 font-medium text-sm">Job Application</span>

                                <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    {jobDetails?.job_title.toLocaleUpperCase()}
                                </h1>

                                <div className="mt-4 flex flex-wrap gap-4">

                                    <div className="flex items-center text-gray-600">
                                        <Building2 className="w-4 h-4 mr-2 text-green-600" />
                                        <span>{jobDetails?.company?.company_name.toUpperCase()}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                                        <span>{jobDetails?.job_location}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                                        <span>{jobDetails?.job_type}</span>
                                    </div>

                                </div>

                            </div>


                            <form onSubmit={handleSubmit} className="space-y-6">


                                {/* Resume Section */}
                                <div className="border-2 border-dashed border-green-200 rounded-xl p-4 sm:p-6 bg-green-50/50 transition-all hover:bg-green-50">


                                    <div className="flex justify-between items-center mb-4">

                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
                                            {!resumeUrl && (
                                                <p className="text-sm text-gray-600 mt-1">Upload your resume to apply for this position</p>
                                            )}
                                        </div>

                                        {resumeUrl && !isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                <span>Replace</span>
                                            </button>
                                        )}


                                    </div>


                                    {resumeUrl && !isEditing ? (


                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="text-green-600" />
                                                    <span className="font-medium">Current Resume</span>
                                                </div>
                                            </div>

                                            {
                                                userLoading || userFetching || userError ? (

                                                    <div className="h-[100vh] bg-white rounded-xl overflow-hidden border border-green-100 animate-pulse">
                                                        <div className="w-full h-full bg-gray-200"></div>
                                                    </div>

                                                ) : (

                                                    <div className="min-h-[50vh] md:h-[100vh] bg-white rounded-xl overflow-hidden border border-green-100">
                                                        <iframe
                                                            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
                                                            className="w-full h-[50vh] sm:h-full border-0 [&::-webkit-scrollbar]:hidden"
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                ['-ms-overflow-style' as any]: 'none',
                                                                ['scrollbar-width' as any]: 'none',
                                                            }}
                                                            title="Resume Preview"
                                                        />
                                                    </div>

                                                )
                                            }

                                        </div>


                                    ) : (

                                        <div className={`text-center ${!resumeUrl ? 'py-12' : 'py-8'}`}>

                                            <Upload className="mx-auto h-12 w-12 text-green-600" />

                                            <div className="mt-4">
                                                <label className="cursor-pointer">
                                                    <span className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors inline-block">
                                                        {resumeUrl ? 'Replace Resume' : 'Upload Resume'}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf"
                                                        onChange={handleResumeUpload}
                                                    />
                                                </label>
                                            </div>

                                            <p className="text-gray-500 mt-2">PDF, up to 2MB</p>

                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="mt-4 text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                        </div>
                                    )}

                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`w-full py-4 px-6 rounded-xl flex items-center justify-center space-x-2 
                ${'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'} 
                text-white font-medium transition-all`}
                                >

                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Submit Application {!resumeUrl && '(Without resume)'}</span>
                                    </>

                                </button>
                            </form>
                        </div>
                    </div>

                )


            }
        </div>
    );
};

export default JobApplicationForm;