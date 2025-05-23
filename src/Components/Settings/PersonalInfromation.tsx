import { useEffect, useState } from "react";
import { GetPersonalInfo, EditPersonalInfo } from "@/Hooks/UserProfile";
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import toast from "react-hot-toast";
import { SaveIcon, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { AllLocations } from "@/Hooks/Utils";
import { JObTittles } from "@/Hooks/Utils";



// form inputs
type Inputs = {

    name: string
    email: string
    phone: string
    preferred_work_location: string
    available_work_hours: string
    profile_photo: any
    cover_photo: any
    portfolio: string
    job_title: string
    about: string
    available_working_periods_start_date: string
    available_working_periods_end_date: string
    date_of_birth: string
    age: number
    gender: string

}


// types
interface Option {
    value: string;
    label: string;
}



export default function PersonalInfromation() {


    // Search keyword
    const [Search, setSearch] = useState<string>("")



    // ID of user
    const [id, SetId] = useState('');



    // Get Job Title
    const { data: JobTitle, isLoading: JobTitleLoading , isPending : JobTitlePending } = JObTittles()



    // Get User Personal Information
    const { data, isLoading, isError, isPending, isFetching } = GetPersonalInfo();



    // Get All Locations
    const { data: Location, isLoading: LocationLoading } = AllLocations(Search)



    // Edit User Personal Information
    const { mutate } = EditPersonalInfo();



    // Form State
    const { register, handleSubmit, formState: { errors }, control, reset, watch, setValue } = useForm<Inputs>();




    // Watch date of birth 
    const dateOfBirth = watch("date_of_birth");




    // Calculate age based on date of birth
    useEffect(() => {
        if (dateOfBirth) {
            const dob = new Date(dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            setValue("age", age);
        }
    }, [dateOfBirth, setValue]);





    // Reset form on data change
    useEffect(() => {

        if (data && data.length > 0) {

            const selectedUser = data[0];

            reset(selectedUser)

            SetId(selectedUser.id)

        }
    }, [data, reset]);






    // Edit Information
    const SubmitInfo = (info: Inputs) => {


        if (!data || !id) {
            toast.error("User data is not available. Please try again.");
            return;
        }

        const formData = new FormData();

        // function to append only non-null values
        const appendIfNotEmpty = (key: string, value: any) => {
            if (value !== null && value !== undefined && value !== "") {
                formData.append(key, value);
            }
        };


        appendIfNotEmpty("name", info.name);
        appendIfNotEmpty("email", info.email);
        appendIfNotEmpty("phone", info.phone);
        appendIfNotEmpty("preferred_work_location", info.preferred_work_location);
        appendIfNotEmpty("available_work_hours", info.available_work_hours);
        appendIfNotEmpty("portfolio", info.portfolio);
        appendIfNotEmpty("about", info.about);
        appendIfNotEmpty("job_title", info.job_title);
        appendIfNotEmpty("date_of_birth", info.date_of_birth);
        appendIfNotEmpty("age", info.age);
        appendIfNotEmpty("gender", info.gender);
        // appendIfNotEmpty("available_working_periods_start_date", info.available_working_periods_start_date);
        // appendIfNotEmpty("available_working_periods_end_date", info.available_working_periods_end_date);



        mutate(
            { formData, id: id },
            {
                onSuccess: (response) => {
                    if (response.status >= 200 && response.status < 300) {
                        reset();
                        toast.success("Personal Information Updated Successfully");
                    } else {
                        toast.error("Something went wrong. Please try again.");
                    }
                },
                onError: (error) => {
                    toast.error("An error occurred: " + error.message);
                }
            }
        );


    };





    return (

        <>


            <section>


                <form onSubmit={handleSubmit(SubmitInfo)}>


                    {

                        isLoading || isPending || isFetching || isError ?


                            // Loading Skeleton
                            <div className="border-b border-gray-900/10 pb-12 animate-pulse">

                                <h2 className="text-2xl pb-3 font-semibold bg-gray-200 h-6 w-1/3 rounded-full"></h2>
                                <p className="mt-1 bg-gray-200 h-4 w-2/3 rounded-full"></p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {[...Array(10)].map((_, i) => (
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


                            // Form
                            < div className="border-b border-gray-900/10 pb-12">

                                <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                    Personal Information <UserRound size={24} className="ml-2" />
                                </h2>


                                <p className="mt-1 text-sm/6 text-gray-600 ">
                                    Use a permanent address where we  can communicate with you
                                </p>


                                <div className="sm:mt-10 mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                    {/*  name */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Name
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600 ms-2">{errors.name.message}</p>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                type="text"
                                                autoComplete="given-name"
                                                {...register("name", { required: "Name is required" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>

                                    </div>



                                    {/* Email address */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Email address
                                            {errors.email && (
                                                <span className="text-sm text-red-500 ms-2">{errors.email.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                {...register("email", {
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: "Please enter a valid email address"
                                                    },
                                                    required: "Email is required"
                                                })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />

                                        </div>
                                    </div>




                                    {/* Phone Number */}
                                    <div className="sm:col-span-3 mt-2">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Phone Number
                                            {errors.phone && (
                                                <span className="text-sm text-red-500 ms-2">{errors.phone.message}</span>
                                            )}
                                        </label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            rules={{
                                                maxLength: {
                                                    value: 13,
                                                    message: "Phone number cannot exceed 10 digits"
                                                },
                                                required: "Phone number is required"
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput
                                                    international
                                                    defaultCountry="IN"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.phone ? "ring-red-500" : "ring-gray-400"}`}
                                                />
                                            )}
                                        />

                                    </div>





                                    {/* Available Work Hours */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="work-hours"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Available Work Hours
                                            {errors.available_work_hours && (
                                                <span className="text-sm text-red-500 ms-2">{errors.available_work_hours.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="work-hours"
                                                min={1}
                                                max={24}
                                                type="number"
                                                autoComplete="work-hours"
                                                {...register("available_work_hours", { required: "Available work hours is required", min: { value: 1, message: "Available work hours must be between 1 and 24" }, max: { value: 24, message: "Available work hours must be between 1 and 24" } })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>




                                    {/* Date of Birth */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="ate_of_birth"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Date of Birth
                                            {errors.date_of_birth && (
                                                <span className="text-sm text-red-500 ms-2">{errors.date_of_birth.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="ate_of_birth"
                                                type="date"
                                                autoComplete="off"
                                                {...register("date_of_birth", { required: "Date of birth is required" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>




                                    {/* Age */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="age"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Age
                                            {errors.age && (
                                                <span className="text-sm text-red-500 ms-2">{errors.age.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="age"
                                                min={14}
                                                disabled
                                                type="number"
                                                autoComplete="age"
                                                {...register("age", { required: "Age is required", min: { value: 14, message: "Must be 14 or older" } })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>




                                    {/* Gender */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="gender"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Gender
                                            {errors.gender && (
                                                <span className="text-sm text-red-500 ms-2">{errors.gender.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <select  {...register("gender", { required: "Gender is required" })} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

                                                <option value="" disabled>Select Your Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>

                                            </select>
                                        </div>
                                    </div>




                                    {/* Portfolio/LinkedIn Profile Link */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="portfolio-link"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Portfolio/LinkedIn Profile Link (optional)
                                            {errors.portfolio && (
                                                <span className="text-sm text-red-500 ms-2">{errors.portfolio.message}</span>
                                            )}
                                        </label>
                                        <input
                                            id="portfolio-link"
                                            autoComplete="portfolio-link"
                                            type="url"
                                            {...register("portfolio")}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="Enter your portfolio or LinkedIn profile URL"
                                        />
                                    </div>




                                    {/* Available Working Period Start Date */}
                                    {/* <div className="sm:col-span-3">
                                        <label
                                            htmlFor="available_working_periods_start_date"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Available Working Period Start Date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="available_working_periods_start_date"
                                                type="date"
                                                autoComplete="off"
                                                {...register("available_working_periods_start_date")}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div> */}



                                    {/* Available Working Period  End Date */}
                                    {/* <div className="sm:col-span-3">
                                        <label
                                            htmlFor="available_working_periods_start_date"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Available Working Period End Date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="available_working_periods_end_date"
                                                type="date"
                                                autoComplete="off"
                                                {...register("available_working_periods_end_date")}

                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div> */}



                                    {/* Work Location */}
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="city-area"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Preferred Work Location
                                            {errors.preferred_work_location && (
                                                <span className="text-sm text-red-500 ms-2">{errors.preferred_work_location.message}</span>
                                            )}
                                        </label>
                                        <div className="mt-2">
                                            <Controller
                                                name="preferred_work_location"
                                                control={control}
                                                rules={{ required: "Work Location is required" }}
                                                render={({ field: { onChange, value, ref } }) => {
                                                    const selectedOption =
                                                        Location?.find((option: Option) => option?.label === value) ||
                                                        (value ? { label: value, value } : null);
                                                    return (
                                                        <Select
                                                            ref={ref}
                                                            options={Location}
                                                            value={selectedOption}
                                                            onChange={(option: any) => onChange(option?.label || null)}
                                                            onInputChange={(searchValue) => setSearch(searchValue)}
                                                            placeholder="Search for a location..."
                                                            isSearchable={true}
                                                            loadingMessage={() => "Loading..."}
                                                            isLoading={LocationLoading}
                                                            noOptionsMessage={() => "No Locations Found..."}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                        />
                                                    );
                                                }}
                                            />

                                        </div>
                                    </div>




                                    {/* Job Title */}
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Job Title
                                            {errors.job_title && (
                                                <span className="text-sm text-red-500 ms-2">{errors.job_title.message}</span>
                                            )}
                                        </label>
                                        <div>
                                            <Controller
                                                name="job_title"
                                                rules={{ required: "Job Title is required" }}
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        ref={ref}
                                                        options={JobTitle}
                                                        value={value ? JobTitle?.find((option: Option) => option.label === value) : null}
                                                        onChange={(selectedOption) => onChange(selectedOption?.label)}
                                                        placeholder="Search Your Job Title"
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        isLoading={JobTitleLoading || JobTitlePending}
                                                        classNamePrefix="select"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>



                                    {/* About */}
                                    <div className="sm:col-span-3">
                                        <label htmlFor="references-testimonials" className="block text-sm/6 font-medium text-gray-900">
                                            About You
                                            {errors.about && (
                                                <span className="text-sm text-red-500 ms-2">{errors.about.message}</span>
                                            )}
                                        </label>
                                        <textarea
                                            id="references-testimonials"
                                            rows={3}
                                            {...register('about', { required: "This field is required" })}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="Discribe yourself"
                                        ></textarea>

                                    </div>


                                </div>



                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm/6 font-semibold text-gray-900 border px-2 py-2 rounded-md border-gray-300" onClick={() => { reset() }}>
                                        Cancel
                                    </button>
                                    <Button type="submit" className="w-full sm:w-auto">
                                        Save Changes  <SaveIcon size={24} />
                                    </Button>

                                </div>


                            </div>


                    }

                </form>

            </section >


        </>


    )
















}
