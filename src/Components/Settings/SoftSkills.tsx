import { Controller, useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { GetSoftSkills, AddSoftSkill, DeleteSoftSkills } from '@/Hooks/UserProfile';
import toast from 'react-hot-toast';
import { CirclePlusIcon, Lightbulb, X } from 'lucide-react';
import SoftSkillData from '../../Data/SoftSkillData.json';
import makeAnimated from 'react-select/animated';
import { Button } from '../ui/button';




interface Inputs {

    soft_skill: string;

}


// Animation
const animatedComponents = makeAnimated();


export default function SoftSkills() {


    // Get User Soft Skills
    const { data, isLoading, isError, isPending, isFetching } = GetSoftSkills()


    // Add Soft Skills 
    const { mutate: AddSoftSkills } = AddSoftSkill()



    // Delete Soft Skills
    const { mutate: DeleteSoftSkill } = DeleteSoftSkills()



    // Convert skills data to a grouped format expected by react-select
    const groupedSkills = SoftSkillData.skills.map((category) => ({
        label: category.category,
        options: category.skills
    }))




    // Form State
    const { handleSubmit, control, reset, formState: { errors } } = useForm<Inputs>();




    // Submit form softskills
    const SubmitSoftSkills = (data: Inputs) => {

        const formdata = new FormData()

        formdata.append("soft_skill", data.soft_skill)


        AddSoftSkills({ formData: formdata }, {

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

        DeleteSoftSkill(id, {

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


                            <form onSubmit={handleSubmit(SubmitSoftSkills)}>


                                <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                    Soft Skills <Lightbulb size={24} className='ml-2' /> (Optional)
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:grid-rows-1">
                                    {/* Technical Skills */}
                                    <div className="sm:col-span-5">
                                        <label
                                            htmlFor="feild-of-study"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Soft Skills
                                        </label>
                                        <div>
                                            <Controller
                                                name="soft_skill"
                                                control={control}
                                                rules={{ required: "At least one Skill is required" }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <CreatableSelect
                                                        ref={ref}
                                                        options={groupedSkills}
                                                        value={value ? groupedSkills.find((option) => option.label === value) : null}
                                                        onChange={(option: any) => { onChange(option.label) }}
                                                        placeholder={"Search Your Skill or Create New"}
                                                        isSearchable={true}
                                                        className="basic-single"
                                                        isClearable={true}
                                                        classNamePrefix="select"
                                                        components={animatedComponents}
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.soft_skill && (
                                            <span className="text-sm text-red-500">{errors.soft_skill.message}</span>
                                        )}
                                    </div>


                                    {/* Buttons */}

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


                            {/* Skills display */}
                            <div className=" py-5 rounded-lg  space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

                                    <div className="flex flex-wrap gap-2">

                                        {data?.map((item: any, idx: number) => (
                                            <span
                                                key={idx}
                                                className="flex items-center px-3 py-1 bg-blue-300 text-black rounded-full text-sm font-medium shadow-sm"
                                            >
                                                {item?.soft_skill}

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

            </section>



        </>


    )



}
