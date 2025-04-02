import { Dialog, DialogContent } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from 'framer-motion';
import { BadgeCheck, Loader, RefreshCw, ShieldCheck } from "lucide-react";
import { EmailVerification, ResendOtp } from "@/Hooks/UserLogin";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";



// Props
interface EmailOtpProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    RegisterData: any
    reset: () => void
    handleStatus: () => void
}



// Form Schema
const FormSchema = z.object({

    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),

})



export default function EmailOtp({ isOpen, setIsOpen, RegisterData, reset, handleStatus }: EmailOtpProps) {



    // Otp time out
    const [timeLeft, setTimeLeft] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [otpExpired, setOtpExpired] = useState(false);



    // Timer function
    useEffect(() => {

        if (!isOpen) return;

        setTimeLeft(300);
        setIsResendDisabled(true);
        setOtpExpired(false);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setOtpExpired(true);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
        
    }, [isOpen]);



    // Function to format time (MM:SS)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };



    // Email Verification
    const { mutate, isPending: isverifying } = EmailVerification()


    // Resend Otp
    const { mutate: resendOtp, isPending: isResending } = ResendOtp()


    // Form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {

            pin: "",

        },
    });



    // Handle Submit
    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const formdata = new FormData()

        formdata.append("otp", data.pin)
        formdata.append("email", RegisterData.email)
        formdata.append("username", RegisterData.username)
        formdata.append("password", RegisterData.password)


        mutate(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("User Registered Successfully")
                    reset()
                    setIsOpen(false)
                    handleStatus()

                } else {

                    console.log(response);

                    toast.error(`${response?.response?.data?.non_field_errors[0] ? response.response.data.non_field_errors[0] : "Something went wrong. Please try again."}`)

                }

            }

        })

    }



    // Resend Otp
    const handleResendOtp = () => {

        setTimeLeft(300);
        setIsResendDisabled(true);
        setOtpExpired(false);

        const formdata = new FormData()

        formdata.append("email", RegisterData.email)
        formdata.append("username", RegisterData.username)
        formdata.append("password", RegisterData.password)
        formdata.append("password_confirm", RegisterData.repassword)


        resendOtp(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("Otp has been resent to your Email.")

                } else {

                    console.log(response);
                    toast.error("Something went wrong. Please try again.")

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
                            <h2 className="text-2xl font-bold flex items-center justify-center">Verification Required <ShieldCheck size={26} /></h2>
                            <p className="text-gray-500 mt-2">Please enter the code sent to your Email</p>
                        </motion.div>


                        <Form {...form}>


                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (

                                        <FormItem className="space-y-4">

                                            <FormControl>

                                                <div className="flex justify-center">

                                                    <InputOTP maxLength={6} {...field} className="gap-4">
                                                        <InputOTPGroup className="gap-2">
                                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                                >
                                                                    <InputOTPSlot
                                                                        index={index}
                                                                        className="w-12 h-14 text-lg rounded-xl border border-gray-400 shadow-sm"
                                                                    />
                                                                </motion.div>
                                                            ))}
                                                        </InputOTPGroup>
                                                    </InputOTP>

                                                </div>

                                            </FormControl>

                                            <FormDescription className="text-center text-gray-500">
                                                Check your Email for the verification code
                                            </FormDescription>

                                            {/* Countdown Timer */}
                                            <p className="text-center text-gray-500">
                                                {otpExpired ? (
                                                    <span className="text-red-500">OTP Expired! Please request a new one.</span>
                                                ) : (
                                                    <span className="text-black font-semibold">OTP Expires In <span className="text-red-500">{formatTime(timeLeft)}</span> </span>
                                                )}
                                            </p>

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
                                        disabled={otpExpired || isverifying || isResending}
                                        className={`${otpExpired || isverifying || isResending ? "bg-gray-400 hover:cursor-not-allowed py-6" : " w-full py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"} `}
                                    >
                                        Verify {isverifying || isResending ? <Loader className="animate-spin  ms-1 duration-3000" /> : <BadgeCheck size={24} />}

                                    </Button>

                                    <Button
                                        type="button"
                                        variant="default"
                                        className="text-white bg-black font-semibold py-6"
                                        onClick={handleResendOtp}
                                        disabled={isResendDisabled || isResending}
                                    >
                                        Resend OTP {isResending ? <Loader className="animate-spin ms-1 duration-3000" /> : <RefreshCw />}
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
