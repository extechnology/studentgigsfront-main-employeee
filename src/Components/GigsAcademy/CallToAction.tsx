import { Button } from '../ui/button';
import { ArrowRight, Mail, Phone, CheckSquare } from 'lucide-react';;
import { motion } from 'framer-motion';
import BlurFade from '../ui/blur-fade';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitEnroll } from '@/Hooks/EntrollHook';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';




const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    course: z.string().nonempty("Please select a course"),
});



const CallToAction = () => {


    // Submit Enroll
    const { mutate } = SubmitEnroll()


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });


    // On Submit
    const onSubmit = (data: any) => {


        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("interested_course", data.course)


        mutate(formData, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("Form submitted successfully! We will get back to you soon.");
                    reset();
                
                } else {

                    toast.error("Something went wrong. Please try again Later.");
                   
                }

            }

        })

    };



    return (


        <section id='enroll' className="py-16 px-3 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden">

            <BlurFade delay={0.25} duration={0.5} inView className='w-full flex justify-center items-center'>


                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">


                        <div className="flex-1">

                            <motion.h2
                                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                Ready to Transform Your Career?
                            </motion.h2>
                            <motion.p
                                className="text-white/90 text-lg mb-8 max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Join thousands of students who have upgraded their skills and boosted their career opportunities with our practical, industry-focused courses.
                            </motion.p>


                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >

                                <Button className="border bg-orange-500 text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-lg">
                                    <span>Enroll Now</span>
                                    <ArrowRight className="ml-2" size={18} />
                                </Button>

                            </motion.div>

                        </div>



                        <motion.div
                            className="flex-1 max-w-md w-full"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className=" backdrop-blur-lg bg-white/15 p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>


                                <h3 className="text-2xl font-bold mb-6 text-center">Get a Free Consultation</h3>


                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                                            <CheckSquare size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            {...register("name")}
                                            placeholder="Your Name"
                                            className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                                            <Mail size={16} />
                                        </div>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Email Address"
                                            className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                                            <Phone size={16} />
                                        </div>
                                        <input
                                            type="tel"
                                            {...register("phone")}
                                            placeholder="Phone Number"
                                            className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>

                                    <div className="relative">
                                        <select
                                            {...register("course")}
                                            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
                                        >
                                            <option value="" disabled className="text-gray-700">Interested in Course</option>
                                            <option value="workspace-essentials" className="text-gray-700">Workspace Essentials</option>
                                            <option value="professional-excellence" className="text-gray-700">Professional Excellence</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ArrowRight size={16} className="text-white/70 transform rotate-90" />
                                        </div>
                                        {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button type="submit" className="w-full bg-white text-orange-600 hover:bg-orange-50 py-6 rounded-lg font-semibold">
                                            Request Callback
                                        </Button>
                                    </motion.div>

                                    <p className="text-center text-white/60 text-xs mt-3">
                                        By submitting, you agree to our <Link to={'/privacypolicy'} className="underline hover:text-white">Privacy Policy</Link>
                                    </p>
                                    
                                </form>

                            </div>

                        </motion.div>

                    </div>

                </div>

            </BlurFade>

        </section>
    );
};

export default CallToAction;
