import CreatableSelect from 'react-select/creatable';
import { CirclePlusIcon, Laptop, X } from "lucide-react";
import { Controller, useForm } from 'react-hook-form';
import Selecet from 'react-select';
import TechSkills from '../../Data/TechSkills.json';
import { GetTechSkills, AddTechSkills, DeleteTechSkills } from '@/Hooks/UserProfile';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';





interface Inputs {

    technical_skill: string;
    technical_level: string
}



const Levels = [

    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' },
];



export default function Skills() {



    // Get User Tech Skills
    const { data, isLoading, isError, isPending, isFetching } = GetTechSkills()



    // Add User Tech Skills
    const { mutate: AddSkill } = AddTechSkills()



    // Delete User Tech Skills
    const { mutate: DeleteSkill } = DeleteTechSkills()



    // Form State
    const { handleSubmit, control, reset, formState: { errors } } = useForm<Inputs>();



    // Convert skills data to a grouped format expected by react-select
    const groupedSkills = TechSkills.skills.map((category) => ({
        label: category.category,
        options: category.skills
    }))




    // Submit Skill Form
    const SubmitSkills = (data: Inputs) => {

        console.log(data);

        const formdata = new FormData()

        formdata.append("technical_skill", data.technical_skill)
        formdata.append("technical_level", data.technical_level)


        AddSkill({ formData: formdata }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Skill Added Successfully");
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

        DeleteSkill(id, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Skill Deleted Successfully");
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


            <section className="border-b border-gray-900/10 pb-12">


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


                            <form onSubmit={handleSubmit(SubmitSkills)}>


                                <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                    Technical Skills <Laptop size={24} className='ml-2' />
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                    {/*Technical Skills */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Technical Skills
                                        </label>
                                        <div>
                                            <Controller
                                                name="technical_skill"
                                                control={control}
                                                rules={{ required: "At least one Skill is required" }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <CreatableSelect
                                                        ref={ref}
                                                        options={groupedSkills}
                                                        value={value ? groupedSkills.find((option) => option.label === value) : null}
                                                        onChange={(option) => { onChange(option?.label) }}
                                                        placeholder={"Search Your Skill or Create New"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"

                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.technical_skill && (
                                            <span className="text-sm text-red-500">{errors.technical_skill.message}</span>
                                        )}


                                    </div>



                                    {/* Levels */}
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Level
                                        </label>
                                        <div>
                                            <Controller
                                                name="technical_level"
                                                control={control}
                                                rules={{ required: "Level is required" }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Selecet
                                                        ref={ref}
                                                        options={Levels}
                                                        value={value ? Levels.find((option) => option.value === value) : null}
                                                        onChange={(option) => { onChange(option?.value) }}
                                                        placeholder={"Select your Level"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={false}
                                                        classNamePrefix="select"
                                                        noOptionsMessage={() => "No Options...."}
                                                    />
                                                )}
                                            />
                                        </div>

                                        {errors.technical_level && (
                                            <span className="text-sm text-red-500">{errors.technical_level.message}</span>
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
                            <div className=" py-5 rounded-lg  space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

                                    <div className="flex flex-wrap gap-2">

                                        {data?.map((item: any, idx: number) => (
                                            <span
                                                key={idx}
                                                className="flex items-center px-3 py-1 bg-green-300 text--700 rounded-full text-sm font-medium shadow-sm"
                                            >
                                                {item?.technical_skill}

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

                        </div>

                }

            </section >



        </>


    )
}
