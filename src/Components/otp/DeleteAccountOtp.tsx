import { Dialog, DialogContent } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { BadgeCheck, Loader, RefreshCw, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDeleteAccountOtp, useVerifyDeleteAccountOtp } from "@/Hooks/UserLogin";
import { Input } from "../ui/input";





// Props
interface DeleteAccountProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}




// Step schema
const EmailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});




const OtpSchema = z.object({
    pin: z.string().min(6, "OTP must be 6 digits"),
});




export default function DeleteOtpModal({ isOpen, setIsOpen }: DeleteAccountProps) {


    const [step, setStep] = useState<"email" | "otp">("email");
    const [timeLeft, setTimeLeft] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [otpExpired, setOtpExpired] = useState(false);


    // Add a state to trigger timer reset
    const [timerKey, setTimerKey] = useState(0);


    // Email send otp
    const { mutate: EmailOtpSend, isPending } = useDeleteAccountOtp();



    // Verify otp
    const { mutate: VerifyOtp, isPending: isVerifyPending } = useVerifyDeleteAccountOtp();




    // Timer
    useEffect(() => {

        if (step !== "otp" || !isOpen) return;

        setTimeLeft(600);
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

    }, [step, isOpen, timerKey]);



    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };



    // Forms
    const emailForm = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        mode: "onChange",
        defaultValues: { email: "" },
    });



    const otpForm = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        mode: "onChange",
        defaultValues: { pin: "" },
    });




    // Submit email
    const handleSendOtp = (data: z.infer<typeof EmailSchema>) => {

        const formdata = new FormData();

        formdata.append("identifier", data.email);


        EmailOtpSend(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("An Otp has been sent to your Email.", { duration: 4000 });
                    setStep("otp");

                } else {

                    toast.error("Something went wrong. Please try again");

                }
            }

        })

    };





    // Submit otp
    const handleVerifyOtp = (data: z.infer<typeof OtpSchema>) => {

        const formdata = new FormData();

        formdata.append("identifier", emailForm.getValues().email);
        formdata.append("otp", data.pin);


        VerifyOtp(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("Request has been sent & your account will be deleted in 60days", { duration: 4000 });
                    setIsOpen(false);
                    emailForm.reset();
                    otpForm.reset();
                    setStep("email");

                } else {

                    toast.error(`${response?.response?.data?.otp ? response.response.data.otp[0] : "Something went wrong. Please try again."}`);

                }

            }

        })

    };




    // Resend otp
    const handleResendOtp = () => {

        const formdata = new FormData();

        formdata.append("identifier", emailForm.getValues().email);

        EmailOtpSend(formdata, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status <= 300) {

                    toast.success("An Otp has been resent to your Email.", { duration: 4000 });
                    setTimerKey(prev => prev + 1);
                    setIsResendDisabled(true);
                    setOtpExpired(false);

                } else {

                    toast.error("Something went wrong. Please try again");

                }
            }

        })

    };



    return (


        <Dialog open={isOpen} onOpenChange={setIsOpen}>


            <DialogContent className="p-0 max-w-md overflow-hidden rounded-3xl bg-slate-50 border-0 shadow-xl">


                <div className="p-10">


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-2xl font-bold flex items-center justify-center">
                            {step === "email" ? "Enter Your Email Address" : "OTP Verification"}{" "}
                            <ShieldCheck size={26} />
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {step === "email"
                                ? "We’ll send a OTP to your Email Address"
                                : "Enter the code sent to your Email Address"}
                        </p>
                    </motion.div>



                    {step === "email" ? (


                        <Form {...emailForm} key="mobile-form">


                            <form
                                onSubmit={emailForm.handleSubmit(handleSendOtp)}
                                className="space-y-6"
                            >

                                <FormField
                                    control={emailForm.control}
                                    name="email"
                                    render={({ field }) => (

                                        <FormItem className="space-y-4">

                                            <FormControl>

                                                <Input {...field} className="py-6" type="email" placeholder="Enter Your Email" />

                                            </FormControl>

                                            <FormMessage className="text-center" />

                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className={`w-full py-6 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    Send OTP {isPending ? (<Loader className="animate-spin" />) : (<BadgeCheck />)}
                                </Button>

                            </form>

                        </Form>


                    ) : (

                        <Form {...otpForm} key="otp-form">
                            <form
                                onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                                className="space-y-6"
                            >
                                {/* OTP Input */}
                                <FormField
                                    control={otpForm.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormControl>
                                                <div className="flex justify-center">
                                                    <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                                                        <InputOTPGroup>
                                                            {Array.from({ length: 6 }).map((_, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    index={index}
                                                                    className="w-12 h-14 text-lg rounded-md border border-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black transition ml-2"
                                                                />
                                                            ))}
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-center" />
                                        </FormItem>
                                    )}
                                />

                                {/* Countdown */}
                                <p className="text-center text-gray-500">
                                    {otpExpired ? (
                                        <span className="text-red-500">
                                            OTP Expired! Please request a new one.
                                        </span>
                                    ) : (
                                        <span className="text-black font-semibold">
                                            OTP Expires In{" "}
                                            <span className="text-red-500">{formatTime(timeLeft)}</span>
                                        </span>
                                    )}
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-col space-y-3">
                                    <Button
                                        type="submit"
                                        disabled={otpExpired || isVerifyPending}
                                        className={`py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${otpExpired || isVerifyPending
                                            ? "bg-gray-400 hover:cursor-not-allowed"
                                            : "bg-black text-white"
                                            }`}
                                    >
                                        {isVerifyPending ? (
                                            <>
                                                Verifying <Loader className="animate-spin ml-2" />
                                            </>
                                        ) : (
                                            <>
                                                Verify <BadgeCheck className="ml-2" size={18} />
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isResendDisabled}
                                        className={`text-white bg-black font-semibold py-6 rounded-xl shadow-md hover:shadow-lg ${isResendDisabled ? "bg-gray-400 hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
                                    >
                                        Resend OTP <RefreshCw className="ml-2" />
                                    </Button>
                                </div>
                            </form>
                        </Form>


                    )}

                </div>


            </DialogContent>


        </Dialog>

    );

}
