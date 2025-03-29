import { Building2, Calendar1, CirclePlus, Hourglass, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { GetExperience, AddExperience, DeleteExperience } from "@/Hooks/UserProfile";
import toast from "react-hot-toast";
import { JObTittles, PostJobTittle } from "@/Hooks/Utils";



interface FormInputs {
    exp_job_title: string;
    exp_company_name: string;
    exp_start_date: Date | undefined;
    exp_end_date: Date | undefined;
    exp_working: boolean;
}



export default function Experience() {


    // Get Experience
    const { data, isLoading, isError, isFetching } = GetExperience()


    // Post Job Tittle
    const { mutate: PostJobTittleMutate } = PostJobTittle();


    // Get Job Title
    const { data: JobTitle, isLoading: JobTitleLoading } = JObTittles()


    // Add Experience
    const { mutate: AddExp } = AddExperience()



    // Delete Experience
    const { mutate: DeleteExp } = DeleteExperience()



    // Form state
    const { handleSubmit, control, watch, formState: { errors }, reset } = useForm<FormInputs>({
        defaultValues: {
            exp_working: false
        }
    });



    const currentlyWorking = watch("exp_working");



    // Submit form
    const onSubmit = (data: FormInputs) => {

        console.log(data);

        const formdata = new FormData()

        formdata.append("exp_job_title", data.exp_job_title)
        formdata.append("exp_company_name", data.exp_company_name)
        formdata.append("exp_start_date", data.exp_start_date ? format(data.exp_start_date, "yyyy-MM-dd") : "")
        formdata.append("exp_end_date", data.exp_end_date ? format(data.exp_end_date, "yyyy-MM-dd") : "")
        formdata.append("exp_working", data.exp_working ? "true" : "false")


        AddExp({ formData: formdata }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Experience Added Successfully");
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

        DeleteExp(id, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Experience Deleted Successfully");
                } else {
                    toast.error("Something went wrong. Please try again Later.");
                }
            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }

        })

    }



    // Calculate Duration
    const calculateDuration = (startDate: any, endDate: any) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) return `${remainingMonths} mos`;
        if (remainingMonths === 0) return `${years} yr${years > 1 ? 's' : ''}`;
        return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mos`;
    };



    // Format Date
    const formatDate = (date: any) => {
        if (!date) return 'Present';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };





    // Function to handle new job title creation
    const handleCreate = async (inputValue: string) => {

        PostJobTittleMutate(inputValue, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("New Job Tittle Added Successfully");

                } else {

                    toast.error("Something went wrong. Please try again.");

                }
            },

        })

    };

    return (


        <section>



            {

                isLoading || isError || isFetching ?


                    // Loading Skeleton
                    <div className="pb-12 animate-pulse">

                        <h2 className="text-2xl pb-3 font-semibold bg-gray-200 h-6 w-1/3 rounded-full"></h2>
                        <p className="mt-1 bg-gray-200 h-4 w-2/3 rounded-full"></p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {[...Array(2)].map((_, i) => (
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
                    <div className="border-b border-gray-900/10 pb-12">


                        <form onSubmit={handleSubmit(onSubmit)}>


                            <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                Experience <Hourglass className="ml-2" size={24} /> (Optional)
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                                {/* Job Title */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Job Title
                                    </label>
                                    <div>
                                        <Controller
                                            name="exp_job_title"
                                            control={control}
                                            rules={{ required: "Job Title is required" }}
                                            render={({ field: { onChange, value, ref } }) => (
                                                <CreatableSelect
                                                    ref={ref}
                                                    options={JobTitle}
                                                    value={value ? JobTitle?.find((option: any) => option.label === value) : null}
                                                    onChange={(selectedOption) => onChange(selectedOption?.label)}
                                                    placeholder="Search Your Job Title"
                                                    isSearchable={true}
                                                    className="basic-single"
                                                    isClearable={true}
                                                    onCreateOption={(inputValue) => {
                                                        handleCreate(inputValue);
                                                        onChange(inputValue); // Set the value immediately
                                                    }}
                                                    isLoading={JobTitleLoading}
                                                    classNamePrefix="select"
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.exp_job_title && (
                                        <span className="text-sm text-red-500">{errors.exp_job_title.message}</span>
                                    )}
                                </div>



                                {/* Company Name */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Company Name
                                    </label>
                                    <div>
                                        <Controller
                                            name="exp_company_name"
                                            control={control}
                                            rules={{ required: "Company Name is required" }}
                                            render={({ field: { onChange, value, ref } }) => (
                                                <CreatableSelect
                                                    ref={ref}
                                                    options={[]}
                                                    value={value ? { label: value, value: value } : null}
                                                    onChange={(option: any) => onChange(option?.label)}
                                                    placeholder="Search Your Company"
                                                    isSearchable={true}
                                                    className="basic-single"
                                                    isClearable={true}
                                                    classNamePrefix="select"
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.exp_company_name && (
                                        <span className="text-sm text-red-500">{errors.exp_company_name.message}</span>
                                    )}
                                </div>



                                {/* Start Date */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Start Date
                                    </label>
                                    <div>
                                        <Controller
                                            name="exp_start_date"
                                            control={control}
                                            rules={{ required: "Start Date is required" }}
                                            render={({ field: { onChange, value } }) => (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {value ? format(value, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={value}
                                                            onSelect={onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                    </div>
                                    {errors.exp_start_date && (
                                        <span className="text-sm text-red-500">{errors.exp_start_date.message}</span>
                                    )}
                                </div>




                                {/* End Date */}
                                <div className="sm:col-span-3">

                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        End Date
                                    </label>
                                    <div>
                                        <Controller
                                            name="exp_end_date"
                                            control={control}
                                            rules={{ required: !currentlyWorking ? "End Date is required" : false }}
                                            render={({ field: { onChange, value } }) => (
                                                <Popover>
                                                    <PopoverTrigger asChild disabled={currentlyWorking}>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {value ? format(value, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={value}
                                                            onSelect={onChange}
                                                            initialFocus
                                                            disabled={currentlyWorking}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                    </div>


                                    {errors.exp_end_date && (
                                        <span className="text-sm text-red-500">{errors.exp_end_date.message}</span>
                                    )}


                                    {/* Currently Working Checkbox */}
                                    <div className="sm:col-span-2">
                                        <div className="flex items-center space-x-2 h-full pt-4">
                                            <Controller
                                                name="exp_working"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Checkbox
                                                        id="currentlyWorking"
                                                        checked={value}
                                                        onCheckedChange={onChange}
                                                    />
                                                )}
                                            />
                                            <label
                                                htmlFor="currentlyWorking"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I currently work here
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900 border px-2 py-2 rounded-md border-gray-300" onClick={() => { reset() }}>
                                    Cancel
                                </button>
                                <Button type="submit" className="w-full sm:w-auto">
                                    Add Experience <CirclePlus size={24} />
                                </Button>

                            </div>

                        </form>


                        {/* Experience List */}
                        {data?.length > 0 &&

                            <div className="group relative mt-10">

                                {

                                    data?.map((item: any, idx: number) => (


                                        <div
                                            key={idx}
                                            className="group relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-blue-500"
                                        >

                                            {/* Header Section */}
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                                        {item?.exp_job_title}
                                                    </h3>
                                                    <div className="mt-1 flex items-center text-gray-600 font-medium">
                                                        <Building2 className="h-5 w-5 mr-2 text-gray-400" />
                                                        <span>{item?.exp_company_name}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => HandleDelete(item?.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 size={22} />
                                                </button>
                                            </div>

                                            {/* Date & Location Info */}
                                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <Calendar1 className="h-4 w-4 mr-1.5 text-gray-400" />
                                                    <span>
                                                        {formatDate(item?.exp_start_date)} -{" "}
                                                        {item?.exp_working ? "Present" : formatDate(item?.exp_end_date)}
                                                    </span>
                                                    <span className="ml-2 text-gray-400">
                                                        {calculateDuration(item?.exp_start_date, item?.exp_end_date)}
                                                    </span>
                                                </div>

                                                {/* <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                                                    <span className="font-medium">{item?.exp_location || "Remote"}</span>
                                                </div> */}

                                            </div>


                                        </div>

                                    ))

                                }
                            </div>
                        }

                    </div>

            }


        </section>
    );
}