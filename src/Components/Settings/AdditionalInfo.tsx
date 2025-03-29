import CreatableSelect from 'react-select/creatable';
import { Controller, useForm } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import Selecet from 'react-select';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { BadgePlus, SaveIcon, ViewIcon } from 'lucide-react';
import { EditAdditionalInfo, GetAdditionalInfo } from '@/Hooks/UserProfile';
import ResumeViewer from '../Common/ResumeViewer';
import { useEffect, useState } from 'react';



interface Inputs {

    hobbies_or_interests: string;
    willing_to_relocate: string
    reference_or_testimonials: string
    resume: File | null;

}



// Animation
const animatedComponents = makeAnimated();


const options = [

    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },

]




export default function AdditionalInfo() {



    // Get Additional Info
    const { data, isLoading, isError, isFetching } = GetAdditionalInfo()



    // Edit Additional Info
    const { mutate: EditInfo } = EditAdditionalInfo()



    // Form State
    const { register, handleSubmit, control, reset, setValue } = useForm<Inputs>();


    // Resume Viewer modal
    const [isModalOpen, setModalOpen] = useState<Boolean>(false);



    // Set Edit Id
    const [Id, SetId] = useState('');



    // SetDefault Values
    useEffect(() => {
        if (data) {

            const SelectedData = data[0];

            SetId(SelectedData?.id)

            reset(SelectedData)

            setValue('resume', null)
        }
    }, [data, reset])




    // File upload handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files ? e.target.files[0] : null;

        if (file) {

            // Check file type
            if (!['application/pdf'].includes(file.type)) {
                toast.error('Invalid file type! Only PDF, DOC, and DOCX are allowed.');
                return;
            }

            // Check file size (3MB)
            if (file.size > 3 * 1024 * 1024) {
                toast.error('File size exceeds 3MB!');
                return;
            }

            // Set the file in the form state
            setValue('resume', file);
        }

    }



    const SubmitAdditionalInfo = (data: Inputs) => {


        const formdata = new FormData()


        formdata.append("hobbies_or_interests", data.hobbies_or_interests)
        formdata.append("willing_to_relocate", data.willing_to_relocate)
        formdata.append("reference_or_testimonials", data.reference_or_testimonials)
        formdata.append("resume", data.resume ? data.resume : '')


        EditInfo({ formData: formdata, id: Id }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("Additional Information Updated Successfully...");
                }
                else {

                    toast.error(response.message)
                }

            },

            onError: (error) => {

                toast.error(error.message)
            }

        })


    }


    return (

        <>

            <section>


                <div className="pb-12">


                    {

                        isLoading || isError || isFetching ?


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

                                <form onSubmit={handleSubmit(SubmitAdditionalInfo)}>


                                    <h2 className="text-2xl pb-3 font-semibold text-gray-900 flex items-center">Additional Information <BadgePlus size={24} className='ml-2' /></h2>


                                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                                        {/* Hobbies and Interests */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Hobbies and Interests" className="block text-sm/6 font-medium text-gray-900">
                                                Hobbies and Interests (optional)
                                            </label>
                                            <Controller
                                                name="hobbies_or_interests"
                                                control={control}
                                                render={({ field }) => {
                                                    const value = Array.isArray(field.value) ? field.value : field.value ? field.value.split(',') : [];

                                                    return (
                                                        <CreatableSelect
                                                            {...field}
                                                            value={value.map((achievement) => ({
                                                                label: achievement,
                                                                value: achievement,
                                                            }))}
                                                            onChange={(newValue) => {
                                                                field.onChange(newValue ? newValue.map((item) => item.value).join(',') : '');
                                                            }}
                                                            placeholder="Add Your Academic Achievements"
                                                            isSearchable={true}
                                                            className="basic-single"
                                                            isClearable={true}
                                                            isMulti
                                                            noOptionsMessage={() => 'Type to create an achievement'}
                                                            classNamePrefix="select"
                                                            components={animatedComponents}
                                                            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>




                                        {/* References or Testimonials */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="references-testimonials" className="block text-sm/6 font-medium text-gray-900">
                                                References or Testimonials (optional)
                                            </label>
                                            <textarea
                                                id="references-testimonials"
                                                rows={3}
                                                {...register('reference_or_testimonials')}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                placeholder="Provide references or testimonials (optional)"
                                            ></textarea>
                                        </div>



                                        {/* Willingness to Relocate */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="Willingness to Relocate" className="block text-sm/6 font-medium text-gray-900">
                                                Willingness to Relocate
                                            </label>
                                            <Controller
                                                name="willing_to_relocate"
                                                control={control}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <Selecet
                                                        ref={ref}
                                                        options={options}
                                                        value={value ? options.find((option) => option.value === value) : null}
                                                        onChange={(option) => {
                                                            onChange(option?.value);
                                                        }}
                                                        placeholder={'Select'}
                                                        isSearchable={false}
                                                        className="basic-single"
                                                        isClearable={false}
                                                        classNamePrefix="select"
                                                        noOptionsMessage={() => 'No Options....'}
                                                    />
                                                )}
                                            />
                                        </div>



                                        <div className="sm:col-span-3">


                                            {/* Upload Resume */}
                                            <div className="">
                                                <label htmlFor="upload-resume" className="block text-sm font-medium text-gray-900">
                                                    Upload Resume (PDF)
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        id="upload-resume"
                                                        name="upload-resume"
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileChange}
                                                        className="block w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                                    />

                                                </div>
                                            </div>


                                            {
                                                data[0]?.employee_resume && (

                                                    <div>

                                                        <button
                                                            type='button'
                                                            onClick={() => { setModalOpen(true) }}
                                                            className="ml-3 mt-3 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"

                                                        >
                                                            <ViewIcon size={20} /> View Your Resume
                                                        </button>

                                                        <ResumeViewer
                                                            resumeUrl={data[0]?.employee_resume}
                                                            isOpen={!!isModalOpen}
                                                            onRequestClose={() => setModalOpen(false)}
                                                        />

                                                    </div>
                                                )

                                            }
                                            
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



                                </form>
                            </div>

                    }

                </div>

            </section>

        </>




    )

}
