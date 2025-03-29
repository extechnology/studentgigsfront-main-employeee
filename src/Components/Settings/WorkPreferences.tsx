import { BriefcaseBusiness, Save } from "lucide-react";
import { Controller, useForm } from 'react-hook-form';
import Selecet from 'react-select';
import { EditWorkPerference, GetWorkPerference } from "@/Hooks/UserProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PreferedCategory from "./PreferedCategory";
import { Button } from "../ui/button";


// Form inputs
interface Inputs {

    interested_job_type: string;
    expected_salary_range: string
    availability: string
    transportation_availability: string

}


// Job Types
const JobTypes = [

    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Both', label: 'Both' },

];



// Compensation Types
const Availability = [

    { label: "Hourly Rate", value: "hourly" },
    { label: "All-Day Gigs", value: "All-Day Gigs" },
    { label: "Weekend Gigs", value: "Weekend Gigs" },
    { label: "Vacation Gigs", value: "Vacation Gigs" },
    { label: "Project Based", value: "project" },

];


// Transportation Types
const TransportationAvailability = [

    { value: 'Own Vehicle', label: 'Own Vehicle' },
    { value: 'Public Transport', label: 'Public Transport' },
    { value: 'None', label: 'None' },
];




export default function WorkPreferences() {


    // Get Edit Work ID 
    const [Id, Setid] = useState('')



    // Get Work Preferences
    const { data, isLoading, isError, isPending, isFetching } = GetWorkPerference()



    // Edit Work Preferences
    const { mutate: EditWork } = EditWorkPerference()



    // Form State
    const { register, handleSubmit, control, reset } = useForm<Inputs>();



    // Add Default Data
    useEffect(() => {

        if (data && data.length > 0) {

            const selectedData = data[0];

            reset(selectedData);

            Setid(selectedData?.id)

        }
    }, [data, reset]);




    // Sumit Form Work Preferences
    const WorkSubmit = (data: Inputs) => {


        const formdata = new FormData()


        formdata.append("interested_job_type", data.interested_job_type)
        formdata.append("expected_salary_range", data.expected_salary_range)
        formdata.append("availability", data.availability)
        formdata.append("transportation_availability", data.transportation_availability)



        EditWork({ formData: formdata, id: Id }, {

            onSuccess: (response) => {
                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Work Information Updated Successfully");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }

        })

    }



    return (


        <>

            <section className="border-b border-gray-900/10 pb-12">


                {

                    isLoading || isPending || isError || isFetching ?



                        // Loading Skeleton
                        <div className="pb-12 animate-pulse">

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


                        <div>

                            <form onSubmit={handleSubmit(WorkSubmit)}>

                                <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                    Work Preferences <BriefcaseBusiness size={24} className="ml-2" />
                                </h2>


                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                                    {/* Interested Job Type */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Interested Job Type
                                        </label>
                                        <div>
                                            <Controller
                                                name="interested_job_type"
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Selecet
                                                        ref={ref}
                                                        options={JobTypes}
                                                        value={value ? JobTypes.find((option) => option.label === value) : null}
                                                        onChange={(option) => { onChange(option?.label) }}
                                                        placeholder={"Select Your Job Type"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"

                                                    />
                                                )}
                                            />
                                        </div>

                                    </div>



                                    {/* Transportation Availability */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Transportation Availability
                                        </label>
                                        <div>
                                            <Controller
                                                name="transportation_availability"
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Selecet
                                                        ref={ref}
                                                        options={TransportationAvailability}
                                                        value={value ? TransportationAvailability.find((option) => option.label === value) : null}
                                                        onChange={(option) => { onChange(option?.label) }}
                                                        placeholder={"Search Your Categories"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"

                                                    />
                                                )}
                                            />
                                        </div>

                                    </div>


                                    {/* Availability */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Availability
                                        </label>
                                        <div>
                                            <Controller
                                                name="availability"
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Selecet
                                                        ref={ref}
                                                        options={Availability}
                                                        value={value ? Availability.find((option) => option.label === value) : null}
                                                        onChange={(option) => { onChange(option?.label) }}
                                                        placeholder={"Search Your Categories"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"

                                                    />
                                                )}
                                            />
                                        </div>

                                    </div>


                                    {/* Salary Range */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="expected-pay-range"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Expected Pay Range
                                        </label>
                                        <input
                                            id="expected-pay-range"
                                            type="text"
                                            {...register("expected_salary_range")}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                                if (value) {
                                                    e.target.value = Number(value).toLocaleString(); // Format with commas
                                                } else {
                                                    e.target.value = ""; // Keep input empty if cleared
                                                }
                                            }}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            placeholder="e.g., 50,000"
                                        />
                                    </div>

                                </div>


                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm/6 font-semibold text-gray-900 border px-2 py-2 rounded-md border-gray-300" onClick={() => { reset() }}>
                                        Cancel
                                    </button>
                                    <Button type="submit" className="w-full sm:w-auto">
                                        Save Changes  <Save size={24} />
                                    </Button>

                                </div>

                            </form>


                            <PreferedCategory />


                        </div>



                }


            </section>





        </>



    )



}
