import PersonalInfromation from "@/Components/Settings/PersonalInfromation";
import Education from "@/Components/Settings/Education";
import Languages from "@/Components/Settings/Languages";
import Skills from "@/Components/Settings/Skills";
import SoftSkills from "@/Components/Settings/SoftSkills";
import WorkPreferences from "@/Components/Settings/WorkPreferences";
import ProfileEditor from "@/Components/Settings/ProfileImage";
import Experience from "@/Components/Settings/Experience";
import AdditionalInfo from "@/Components/Settings/AdditionalInfo";
import ForgetPassword from "@/Components/otp/ForgetPassword";
import ProfileCompletionCard from "@/Components/Common/ProfileCompletionCard";
import { GetProfileCompletion } from "@/Hooks/UserProfile";
import { useEffect, useState } from "react";



export default function Settings() {



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth', });
  }, []);


  // Forgot Password Modal
  const [forgotModal, setForgotModal] = useState(false);

  const {
    data: profileCompletionData,
    isLoading: isProfileCompletionLoading,
    isError: isProfileCompletionError,
    isFetching: isProfileCompletionFetching,
    refetch: refetchProfileCompletion,
  } = GetProfileCompletion();



  return (

    <>


      <main className="w-full h-auto pt-20 sm:pt-28 bg-slate-50/5">


        {/* User profile pic */}
        <ProfileEditor />


        {/* Profile progress and user profile form */}
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-10" >

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">

            <aside className="lg:sticky lg:top-24">
              <ProfileCompletionCard
                data={profileCompletionData}
                isLoading={isProfileCompletionLoading}
                isError={isProfileCompletionError}
                isFetching={isProfileCompletionFetching}
                onRetry={() => refetchProfileCompletion()}
                actionHref="/settings#settings-forms"
                actionLabel="Continue editing"
              />
            </aside>


            <div id="settings-forms" className="rounded-xl border border-gray-100 bg-white px-4 py-6 shadow-sm sm:px-6 lg:px-10">


          <div className="space-y-12">


            {/* Personal Information */}
            <PersonalInfromation />


            {/* Work Preferences */}
            <WorkPreferences />


            {/* Languages */}
            <Languages />


            {/* Education Form */}
            <Education />


            {/* Skills and Expertise */}
            <Skills />


            {/* Soft Skills */}
            <SoftSkills />



            {/* Experience */}
            <Experience />



            {/* Additional Information */}
            <AdditionalInfo />


            {/* Forget Password */}
            <div className="w-full flex justify-end">

              <a className="text-sm  hover:cursor-pointer text-blue-600 underline" onClick={() => setForgotModal(!forgotModal)}>Forget Password ?</a>

            </div>


            {/* Forget Password Modal */}
            <ForgetPassword isOpen={forgotModal} setIsOpen={setForgotModal} />

          </div>

            </div>

          </div>

        </div>


      </main >


    </>

  )

}
