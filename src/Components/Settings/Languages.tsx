import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form'
import ISO6391 from 'iso-639-1';
import { useEffect, useState } from 'react';
import { GetLanguageInfo, AddLanguageInfo, DeleteLanguageInfo } from '@/Hooks/UserProfile';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CirclePlus, Globe, LanguagesIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';


// Type definitions
interface LanguageOption {

    readonly value: string;
    readonly label: string;
}


interface Inputs {

    language: string,
    language_level: string
}



const Levels = [

    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' },
    { value: 'Native', label: 'Native' }
];


export default function Languages() {


    // Get User Languages
    const { data, isLoading, isError, isPending, isFetching } = GetLanguageInfo()


    // Add User Languages
    const { mutate } = AddLanguageInfo()


    // Delete User Languages
    const { mutate: DeleteLanguage } = DeleteLanguageInfo()



    // Create a state to store the languages
    const [languages, setLanguages] = useState<LanguageOption[]>([])



    // Get all languages from ISO-639-1 and store them in the state
    useEffect(() => {

        const languagesData: LanguageOption[] = ISO6391.getAllNames()

            .map(name => ({
                value: name,
                label: name
            })).sort((a, b) => a.label.localeCompare(b.label));

        setLanguages(languagesData);

    }, []);



    // Form State
    const { handleSubmit, control, reset, formState: { errors } } = useForm<Inputs>();



    // Lang From Submit
    const SubmitLang = (data: Inputs) => {

        const formdata = new FormData()

        formdata.append("language", data.language)
        formdata.append("language_level", data.language_level)


        mutate({ formData: formdata }, {
            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Language Added Successfully");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }

            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }
        })


    }


    // Handle delete
    const HandleDelete = (id: string) => {

        DeleteLanguage(id, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    reset();
                    toast.success("Language Deleted Successfully");
                } else {
                    toast.error("Something went wrong. Please try again Later.");
                }
            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
            }

        })

    }



    // Define proficiency colors
    const getLevelColor = (level: any) => {
        switch (level.toLowerCase()) {
            case 'beginner': return 'bg-emerald-300 text-emerald-700';
            case 'intermediate': return 'bg-blue-300 text-blue-700';
            case 'advanced': return 'bg-purple-300 text-purple-700';
            case 'native': return 'bg-rose-300 text-rose-700';
            case 'expert': return 'bg-amber-300 text-amber-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };


    return (


        <>


            {/*Language Information */}
            <section className='border-b border-gray-900/10 pb-8'>


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

                        <div>


                            <form onSubmit={handleSubmit(SubmitLang)}>

                                <div className="pb-12">

                                    <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">
                                        Languages <Globe size={24} className='ml-2' />
                                    </h2>

                                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        {/*Language */}
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="feild-of-study"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Language
                                            </label>
                                            <div>
                                                <Controller
                                                    name="language"
                                                    control={control}
                                                    rules={{ required: "Language is required" }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <CreatableSelect
                                                            ref={ref}
                                                            value={value ? languages.find((option) => option.value === value) : null}
                                                            options={languages}
                                                            onChange={(option) => { onChange(option?.value) }}
                                                            placeholder={"Select Your Language"}
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            classNamePrefix="select"
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {errors.language && (
                                                <span className="text-sm text-red-500">{errors.language.message}</span>
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
                                                    name="language_level"
                                                    control={control}
                                                    rules={{ required: "Level is required" }}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
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

                                            {errors.language_level && (
                                                <span className="text-sm text-red-500">{errors.language_level.message}</span>
                                            )}

                                        </div>


                                    </div>

                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm/6 font-semibold text-gray-900 border px-2 py-2 rounded-md border-gray-300" onClick={() => { reset() }}>
                                            Cancel
                                        </button>
                                        <Button type="submit" className="w-full sm:w-auto">
                                            Add  <CirclePlus size={24} />
                                        </Button>

                                    </div>

                                </div>

                            </form>



                            {/* Displaying Languages */}
                            {data.length > 0 &&

                                <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 sm:px-3">

                                    <div className="flex items-center gap-2 mb-6">

                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                            Language Skills
                                        </h2>

                                        <LanguagesIcon className="h-6 w-6" />

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                        {data.map((item: any) => (

                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative group"
                                            >
                                                <div className="rounded-lg border border-gray-100 bg-white p-4 hover:shadow-md transition-all duration-300">

                                                    <div className="flex flex-col gap-3">




                                                        {/* Language Name */}
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                {item.language}
                                                            </h3>

                                                            <div className='flex items-center'>

                                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getLevelColor(item.language_level)}`}>
                                                                    {item.language_level}
                                                                </span>

                                                                <button
                                                                    onClick={() => HandleDelete(item.id)}
                                                                    className="text-red-500 ms-2"
                                                                    aria-label="Delete"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>

                                                            </div>
                                                        </div>

                                                        {/* Proficiency Bar */}
                                                        <div className="flex items-center gap-1">
                                                            {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Native'].map((level, index) => {
                                                                const selectedLevel = item.language_level.toLowerCase();
                                                                const selectedIndex = ['beginner', 'intermediate', 'advanced', 'expert', 'native'].indexOf(selectedLevel);
                                                                const currentIndex = index;
                                                                const isActive = currentIndex <= selectedIndex;
                                                                const barColor = isActive ? getLevelColor(selectedLevel) : 'bg-gray-200';

                                                                return (
                                                                    <div key={level} className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-100">
                                                                        <div
                                                                            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                                                                        />
                                                                    </div>


                                                                );
                                                            })}
                                                        </div>


                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}

                                    </div>
                                </div>


                            }


                        </div>

                }


            </section>


        </>



    )
}
