import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { CirclePlusIcon, X } from 'lucide-react';
import { GetPreferredCategories, AddPreferredCategory, DeletePreferredCategory } from '@/Hooks/UserProfile';
import { JObList } from '@/Hooks/Utils';
import { Button } from '../ui/button';





interface Inputs {

    preferred_job_category: string;

}

export default function PreferedCategory() {



    // Get Job list
    const { data: JobList, isLoading: JobListLoading } = JObList()


    // Get User jOB Categories
    const { data, isLoading, isError, isPending, isFetching } = GetPreferredCategories()



    // Add User JOb Category
    const { mutate: AddCategory } = AddPreferredCategory()



    // Delete User JOb Category
    const { mutate: DeleteCategory } = DeletePreferredCategory()



    // Form State
    const { handleSubmit, control, reset, formState: { errors } } = useForm<Inputs>();




    // Submit Form
    const SubmitJobCategory = (data: Inputs) => {

        const formdata = new FormData()


        formdata.append("preferred_job_category", data.preferred_job_category)


        AddCategory({ formData: formdata }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Category Added Successfully");
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

        DeleteCategory(id, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Category Deleted Successfully");
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


            <section className="pb-12">


                {

                    isLoading || isError || isPending || isFetching ?



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
                        <div>


                            <form onSubmit={handleSubmit(SubmitJobCategory)}>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:grid-rows-1">


                                    {/* Technical Skills */}
                                    <div className="sm:col-span-6">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Preferred Categories
                                        </label>
                                        <div>
                                            <Controller
                                                name="preferred_job_category"
                                                control={control}
                                                rules={{ required: "Select a Category" }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Select
                                                        ref={ref}
                                                        options={JobList}
                                                        value={value ? JobList.find((option: any) => option.value === value) : null}
                                                        onChange={(option: any) => { onChange(option.label) }}
                                                        placeholder={"Select a Category"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"
                                                        noOptionsMessage={() => "No options Found..."}
                                                        isLoading={JobListLoading}

                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.preferred_job_category && (
                                            <span className="text-sm text-red-500">{errors.preferred_job_category.message}</span>
                                        )}
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


                            </form>


                            {/* Skills display */}
                            {data?.length > 0 &&

                                <div className=" py-5 rounded-lg  space-y-6">

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

                                        <div className="flex flex-wrap gap-2">

                                            {data?.map((item: any, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className="flex items-center px-3 py-1 bg-orange-300 text-black rounded-full text-sm font-medium shadow-sm"
                                                >
                                                    {item?.preferred_job_category}

                                                    <button
                                                        onClick={() => HandleDelete(item?.id)}
                                                        className="text-red-500 ms-2"
                                                        aria-label="Delete"
                                                    >
                                                        <X size={18} />
                                                    </button>

                                                </span>
                                            ))}

                                        </div>

                                    </div>

                                </div>

                            }

                        </div>

                }

            </section>



        </>


    )



}
