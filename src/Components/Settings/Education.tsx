import { useForm, Controller } from "react-hook-form"
import { DeleteEducationInfo, GetEducationInfo } from "@/Hooks/UserProfile";
import { UniversityList, FeildOfStudyList } from "@/Hooks/Utils";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useState } from "react";
import { AddEducationInfo } from "@/Hooks/UserProfile";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, Building2, ChevronRight, CirclePlusIcon, GraduationCap, History, Medal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";


interface Inputs {

    academic_level: string,
    field_of_study: string,
    name_of_institution: string
    expected_graduation_year: string
    achievement_name: string

}



const Levels = [

    { label: "No Formal Education", value: "No Formal Education" },
    { label: "Primary Education", value: "Primary Education" },
    { label: "Lower Secondary Education (Middle School)", value: "Lower Secondary Education (Middle School)" },
    { label: "Upper Secondary Education (High School)", value: "Upper Secondary Education (High School)" },

    // Diplomas & Certificates
    { label: "High School Diploma", value: "High School Diploma" },
    { label: "General Educational Development (GED)", value: "General Educational Development (GED)" },
    { label: "Diploma", value: "Diploma" },
    { label: "Certificate", value: "Certificate" },
    { label: "Post-secondary Certificate", value: "Post-secondary Certificate" },

    // Associate Degrees
    { label: "Associate Degree", value: "Associate Degree" },
    { label: "Associate of Arts (A.A.)", value: "Associate of Arts (A.A.)" },
    { label: "Associate of Science (A.S.)", value: "Associate of Science (A.S.)" },
    { label: "Associate of Applied Science (A.A.S.)", value: "Associate of Applied Science (A.A.S.)" },

    // Bachelor's Degrees
    { label: "Bachelor's Degree", value: "Bachelor's Degree" },
    { label: "Bachelor of Arts (B.A.)", value: "Bachelor of Arts (B.A.)" },
    { label: "Bachelor of Science (B.Sc.)", value: "Bachelor of Science (B.Sc.)" },
    { label: "Bachelor of Technology (B.Tech)", value: "Bachelor of Technology (B.Tech)" },
    { label: "Bachelor of Engineering (B.E.)", value: "Bachelor of Engineering (B.E.)" },
    { label: "Bachelor of Business Administration (BBA)", value: "Bachelor of Business Administration (BBA)" },
    { label: "Bachelor of Commerce (B.Com)", value: "Bachelor of Commerce (B.Com)" },
    { label: "Bachelor of Laws (LL.B.)", value: "Bachelor of Laws (LL.B.)" },
    { label: "Bachelor of Education (B.Ed.)", value: "Bachelor of Education (B.Ed.)" },
    { label: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", value: "Bachelor of Medicine, Bachelor of Surgery (MBBS)" },
    { label: "Bachelor of Fine Arts (BFA)", value: "Bachelor of Fine Arts (BFA)" },

    // Master's Degrees
    { label: "Master's Degree", value: "Master's Degree" },
    { label: "Master of Arts (M.A.)", value: "Master of Arts (M.A.)" },
    { label: "Master of Science (M.Sc.)", value: "Master of Science (M.Sc.)" },
    { label: "Master of Technology (M.Tech)", value: "Master of Technology (M.Tech)" },
    { label: "Master of Engineering (M.E.)", value: "Master of Engineering (M.E.)" },
    { label: "Master of Business Administration (MBA)", value: "Master of Business Administration (MBA)" },
    { label: "Master of Laws (LL.M.)", value: "Master of Laws (LL.M.)" },
    { label: "Master of Education (M.Ed.)", value: "Master of Education (M.Ed.)" },
    { label: "Master of Social Work (MSW)", value: "Master of Social Work (MSW)" },
    { label: "Master of Fine Arts (MFA)", value: "Master of Fine Arts (MFA)" },
    { label: "Master of Public Administration (MPA)", value: "Master of Public Administration (MPA)" },
    { label: "Master of Public Health (MPH)", value: "Master of Public Health (MPH)" },

    // Doctoral & Professional Degrees
    { label: "Doctorate (Ph.D.)", value: "Doctorate (Ph.D.)" },
    { label: "Doctor of Medicine (MD)", value: "Doctor of Medicine (MD)" },
    { label: "Doctor of Business Administration (DBA)", value: "Doctor of Business Administration (DBA)" },
    { label: "Doctor of Education (Ed.D.)", value: "Doctor of Education (Ed.D.)" },
    { label: "Doctor of Pharmacy (Pharm.D.)", value: "Doctor of Pharmacy (Pharm.D.)" },
    { label: "Doctor of Law (Juris Doctor - JD)", value: "Doctor of Law (Juris Doctor - JD)" },
    { label: "Doctor of Dental Surgery (DDS)", value: "Doctor of Dental Surgery (DDS)" },
    { label: "Doctor of Veterinary Medicine (DVM)", value: "Doctor of Veterinary Medicine (DVM)" },
    { label: "Doctor of Public Health (DrPH)", value: "Doctor of Public Health (DrPH)" },

    // Postdoctoral
    { label: "Postdoctoral Studies", value: "Postdoctoral Studies" },

    // Vocational & Professional Certifications
    { label: "Vocational Training", value: "Vocational Training" },
    { label: "Professional Certification", value: "Professional Certification" },
    { label: "Trade School Certification", value: "Trade School Certification" },
    { label: "Apprenticeship", value: "Apprenticeship" },
];


// Animation
const animatedComponents = makeAnimated();


export default function Education() {


    // Search Term for University
    const [Search, setSearch] = useState("")



    // Get Feild of Study Options
    const { data: FeildList, isLoading: FeildLoading } = FeildOfStudyList()



    // Add user Education
    const { mutate } = AddEducationInfo()



    // Delete user Education
    const { mutate: Delete } = DeleteEducationInfo()



    // Get Education infotmation data 
    const { data = [], isLoading, isError, isPending, isFetching } = GetEducationInfo()




    // Get University List
    const { data: universities, isLoading: uniloading } = UniversityList(Search)



    // Form State
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<Inputs>();





    // Submit Education Information
    const SubmitEducation = (data: Inputs) => {

        const formdata = new FormData()

        formdata.append("academic_level", data.academic_level)
        formdata.append("field_of_study", data.field_of_study)
        formdata.append("expected_graduation_year", data.expected_graduation_year)
        formdata.append("achievement_name", data.achievement_name ? data.achievement_name : '')
        formdata.append("name_of_institution", data.name_of_institution)


        mutate({ formData: formdata }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Education Information Added Successfully");
                } else {
                    toast.error("Something went wrong. Please try again Later.");
                }
            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }

        })

    }



    // Handle delete
    const HandleDelete = (id: string) => {

        Delete(id, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Education Information Deleted Successfully");
                } else {
                    toast.error("Something went wrong. Please try again Later.");
                }
            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }

        })


    }




    return (



        <>


            {/* Educational Information */}
            <section>

                {

                    isLoading || isError || isPending || isFetching ?


                        // Loading Skeleton
                        <div className="border-b border-gray-900/10 pb-12 animate-pulse">

                            <h2 className="text-2xl pb-3 font-semibold bg-gray-200 h-6 w-1/3 rounded-full"></h2>
                            <p className="mt-1 bg-gray-200 h-4 w-2/3 rounded-full"></p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="sm:col-span-3">
                                        <div className="block text-sm/6 font-medium bg-gray-200 h-4 w-1/4 rounded-full"></div>
                                        <div className="mt-2 h-10 bg-gray-200 rounded-md w-full"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <div className="h-10 w-20 bg-gray-200 rounded-full"></div>
                                <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
                            </div>

                        </div>


                        :

                        <div className="border-b border-gray-900/10 pb-12">

                            <form onSubmit={handleSubmit(SubmitEducation)}>

                                <div className=" pb-12">


                                    <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                        Educational Information <BookOpenText size={24} className="ml-2" />
                                    </h2>

                                    <div className=" mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                                        {/*Current Academic Level */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="feild-of-study"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Current Academic Level
                                            </label>
                                            <div>
                                                <Controller
                                                    name="academic_level"
                                                    control={control}
                                                    rules={{ required: "Academic Level is required" }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <CreatableSelect
                                                            ref={ref}
                                                            options={Levels}
                                                            value={value ? universities?.find((option: any) => option.value === value) : null}
                                                            onChange={(option) => { onChange(option?.value) }}
                                                            placeholder={"Select Your Academic Level"}
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            classNamePrefix="select"

                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.academic_level && (
                                                <span className="text-sm text-red-500">{errors.academic_level.message}</span>
                                            )}


                                        </div>


                                        {/* Feild of Study */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="feild-of-study"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Feild OF Study
                                            </label>
                                            <div>
                                                <Controller
                                                    name="field_of_study"
                                                    control={control}
                                                    rules={{ required: "Field of study is required" }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <CreatableSelect
                                                            ref={ref}
                                                            options={FeildList}
                                                            value={value ? FeildList?.find((option: any) => option.value === value) : null}
                                                            onChange={(option) => { onChange(option?.value) }}
                                                            placeholder={"Search Your Field of Study"}
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            classNamePrefix="select"
                                                            isLoading={FeildLoading}
                                                            loadingMessage={() => "Loading ..."}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {errors.field_of_study && (
                                                <span className="text-sm text-red-500">{errors.field_of_study.message}</span>
                                            )}

                                        </div>



                                        {/* Name of University */}
                                        <div className="sm:col-span-full">
                                            <label
                                                htmlFor="university"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Name of University
                                            </label>
                                            <div className="mt-2">
                                                <Controller
                                                    name="name_of_institution"
                                                    control={control}
                                                    rules={{ required: "Name of University is required" }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <CreatableSelect
                                                            ref={ref}
                                                            options={universities}
                                                            value={value ? universities?.find((option: any) => option.value === value) : null}
                                                            onInputChange={(value) => { setSearch(value) }}
                                                            onChange={(option: any) => { onChange(option?.value) }}
                                                            placeholder={uniloading ? "Loading..." : "Search Your University"}
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            classNamePrefix="select"
                                                            isLoading={uniloading}
                                                            loadingMessage={() => "Loading..."}
                                                            noOptionsMessage={() => "No University Found"}
                                                            components={animatedComponents}

                                                        />
                                                    )}
                                                />
                                            </div>

                                            {errors.name_of_institution && (
                                                <span className="text-sm text-red-500">{errors.name_of_institution.message}</span>
                                            )}

                                        </div>



                                        {/* Expected Year of Graduation */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="expected-graduation-year"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Expected Year of Graduation
                                            </label>
                                            <input
                                                id="expected-graduation-year"
                                                autoComplete="expected-graduation-year"
                                                type="number"
                                                {...register("expected_graduation_year", { required: "Expected Year of Graduation is required" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                placeholder="e.g., 2025"
                                            />
                                            {errors.expected_graduation_year && (
                                                <span className="text-sm text-red-500">{errors.expected_graduation_year.message}</span>
                                            )}
                                        </div>



                                        {/* Academic Achivements */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="university"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Academic Achievements
                                            </label>
                                            <div className="">
                                                <Controller
                                                    name="achievement_name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <CreatableSelect
                                                            {...field}
                                                            value={field.value ?

                                                                (field.value as unknown as string[]).map((achievement) => ({
                                                                    label: achievement,
                                                                    value: achievement
                                                                }))
                                                                : []
                                                            }
                                                            onChange={(newValue) => {

                                                                field.onChange(newValue ? newValue.map(item => item.value) : []);
                                                            }}
                                                            placeholder="Add Your Academic Achievements"
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            isMulti
                                                            noOptionsMessage={() => "Type to create an achievement"}
                                                            classNamePrefix="select"
                                                            components={animatedComponents}
                                                            // Remove options prop to only allow creating new values
                                                            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                                                        />
                                                    )}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm/6 font-semibold text-gray-900 border px-2 py-2 rounded-md border-gray-300" onClick={() => { reset() }}>
                                            Cancel
                                        </button>
                                        <Button type="submit" className="w-full sm:w-auto">
                                            Add  <CirclePlusIcon size={24} />
                                        </Button>

                                    </div>


                                </div>

                            </form>

                            {

                                data.length > 0 &&

                                <div className="w-full max-w-7xl mx-auto py-0 sm:py-6 px-0 sm:px-3">

                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 px-2 flex items-center">
                                        Education History <History className="ml-2" />
                                    </h2>

                                    <AnimatePresence>

                                        {data?.length > 0 && (
                                            <div className="space-y-4 sm:space-y-8">

                                                {data.map((item: any) => (
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
                                                                        {item?.expected_graduation_year}
                                                                    </span>
                                                                </div>

                                                                {/* Middle Column - Main Content */}
                                                                <div className="flex-1 space-y-3">
                                                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <GraduationCap className="h-5 w-8 sm:h-5 sm:w-5 text-blue-500" />
                                                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                                                {item?.name_of_institution}
                                                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs sm:text-sm font-semibold text-blue-700 ms-2">
                                                                                    {item?.academic_level}
                                                                                </span>
                                                                            </h3>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center gap-2 text-gray-600">
                                                                            <Building2 className="h-4 w-4" />
                                                                            <span className="text-xs sm:text-sm">{item?.field_of_study}</span>
                                                                        </div>

                                                                        {item?.achievement_name ?

                                                                            <div className="flex items-start gap-2 text-gray-600">
                                                                                <Medal className="h-4 w-4 mt-0.5 text-yellow-500" />
                                                                                <span className="text-xs sm:text-sm">
                                                                                    {item?.achievement_name.replace(/,/g, ', ')}
                                                                                </span>
                                                                            </div>

                                                                            :

                                                                            <div className="flex items-start gap-2 text-gray-600">
                                                                                <Medal className="h-4 w-4 mt-0.5 text-yellow-500" />
                                                                                <span className="text-xs sm:text-sm">
                                                                                    none
                                                                                </span>
                                                                            </div>

                                                                        }

                                                                    </div>


                                                                </div>

                                                                {/* Right Column - Actions */}
                                                                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                                                    <button
                                                                        onClick={() => HandleDelete(item.id)}
                                                                        className="opacity-100 p-1 sm:p-2 text-red-500 transition-all duration-200"
                                                                        aria-label="Delete education entry"
                                                                    >
                                                                        <Trash2 className="h-6 w-5 sm:h-5 sm:w-5" />
                                                                    </button>
                                                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-hover:text-gray-400 transition-all duration-200" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Hover line indicator */}
                                                        <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-500 opacity-100 transition-all duration-200" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </AnimatePresence>

                                </div>


                            }


                        </div>

                }

            </section>

        </>



    )



}
