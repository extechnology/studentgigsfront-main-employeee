import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { CheckCircle, MessageCircle, Calendar, MapPin, Info, ArrowRight, Loader2, } from "lucide-react";
import { motion } from "framer-motion";
import { VerifyCoursePayment } from "@/Hooks/EntrollHook";
import toast from "react-hot-toast";
import { triggerConfetti } from "@/lib/confetti";




export default function EnrollmentSuccess() {


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    // api call
    const { mutate: Verify, isPending } = VerifyCoursePayment();

    const [verified, setVerified] = useState(false);



    // ✅ VERIFY PAYMENT ON LOAD
    useEffect(() => {

        const sessionId = searchParams.get("order_id");


        if (!sessionId) {
            toast.error("Payment session not found")
            setTimeout(() => {
                navigate("/");
            }, 2000);
            return;
        }

        const formData = new FormData();
        formData.append("order_id", sessionId);

        Verify(formData, {

            onSuccess: () => {

                setVerified(true);

                setTimeout(() => {
                    triggerConfetti();
                }, 300);

            },

            onError: () => {

                toast.error("Payment verification failed")

                setTimeout(() => {
                    navigate("/");
                }, 2000);

            },

        });

    }, []);



    // 🔄 LOADER UI
    if (isPending || !verified) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-gray-600 text-sm">
                    Verifying your payment, please wait...
                </p>
            </div>
        );
    }



    // ✅ SUCCESS UI
    return (
       
       <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 flex items-center justify-center px-4 mt-24 sm:mt-0 sm:py-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl"
            >
                <Card className="rounded-3xl shadow-xl border border-orange-100">
                    <CardContent className="p-6 sm:p-8">

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="flex justify-center mb-4"
                        >
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle className="text-green-600 w-10 h-10" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl font-bold text-center">
                            Enrollment Successful 🎉
                        </h1>

                        {/* Subtitle */}
                        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                            Welcome to{" "}
                            <span className="text-orange-600 font-semibold">
                                StudentsGigs 7-Day Work-Ready Challenge
                            </span>
                            <br />
                            Your seat has been successfully confirmed.
                        </p>

                        <div className="my-6 border-t" />

                        {/* Info */}
                        <div className="space-y-4 text-sm sm:text-base">
                            <div className="flex gap-3">
                                <MessageCircle className="text-orange-500 w-5 h-5 mt-1" />
                                <p>
                                    Further details including batch start date, Day 1 location and
                                    instructions will be shared via WhatsApp.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Info className="text-red-500 w-5 h-5 mt-1" />
                                <p className="font-medium">
                                    Please ensure your WhatsApp number is active.
                                </p>
                            </div>
                        </div>

                        {/* Extra */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-orange-50 p-3 rounded-xl flex gap-2 items-center">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span className="text-xs">Start Date Soon</span>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-xl flex gap-2 items-center">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-xs">Location Shared Soon</span>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="mt-8">
                            <Button
                                onClick={() => navigate("/")}
                                className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white py-5 flex items-center justify-center gap-2"
                            >
                                Go to Home
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}