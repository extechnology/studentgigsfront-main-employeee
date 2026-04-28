import AcademyHero from "@/Components/GigsAcademy/AcademyHero"
import WhyChooseUs from "@/Components/GigsAcademy/WhyChooseUs"
import CoursesSection from "@/Components/GigsAcademy/CoursesSection"
import TestimonialsSection from "@/Components/GigsAcademy/TestimonialsSection"


export default function GigsAcademy() {

  return (

    <>

      <main className="w-full h-auto">


        {/* hero section */}
        <AcademyHero />


        {/* why choose us */}
        <WhyChooseUs />


        {/* Courses */}
        <CoursesSection />


        {/* testimonials */}
        <TestimonialsSection />


      </main>


    </>


  )



}
