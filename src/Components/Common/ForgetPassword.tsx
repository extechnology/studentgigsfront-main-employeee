import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BadgeCheck, KeyRound, Loader } from "lucide-react";
import { ResetPassword } from "@/Hooks/UserLogin";
import toast from "react-hot-toast";




// Props
interface EmailOtpProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}



// Form Schema
const FormSchema = z.object({

    email: z.string().email("Please enter a valid email address"),

})



export default function ForgetPassword({ isOpen, setIsOpen }: EmailOtpProps) {



    // Reset Password 
    const { mutate, isPending } = ResetPassword()


    // Form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {

            email: "",

        },
    });


    // Form Submit
    const onSubmit = (data: z.infer<typeof FormSchema>) => {


        const formdata = new FormData()

        formdata.append("email", data.email)


        mutate(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("Password reset link has been sent to your email.")
                    setIsOpen(false)

                } else {

                    console.log(response);
                    toast.error("Something went wrong Please try again.")

                }
            }

        })

    }



    return (

        <>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>


                <DialogContent className="p-0 max-w-md overflow-hidden rounded-3xl bg-slate-50 border-0 shadow-xl">


                    <div className="p-6">


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-6"
                        >
                            <h2 className="text-2xl font-bold flex items-center justify-center">Reset Password <KeyRound size={24} className="ml-2" /></h2>
                            <p className="text-gray-500 mt-2">Enter your email address linked to your account</p>
                        </motion.div>


                        <Form {...form}>


                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (

                                        <FormItem className="space-y-4">

                                            <FormControl>

                                                <Input {...field} type="email" placeholder="Enter Your Email" />

                                            </FormControl>


                                            <FormDescription className="text-center text-gray-500">
                                                A link will be sent to your email for resetting your password
                                            </FormDescription>


                                            <FormMessage className="text-center" />

                                        </FormItem>
                                    )}
                                />


                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                    className="flex flex-col space-y-3"
                                >
                                    <Button
                                        type="submit"
                                        className={`w-full py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center`}
                                    >
                                        Send {isPending ? <Loader className="animate-spin duration-3000" /> : <BadgeCheck />}

                                    </Button>

                                </motion.div>

                            </form>

                        </Form>

                    </div>

                </DialogContent>

            </Dialog>


        </>


    )
}
