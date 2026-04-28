import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Crown, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { triggerConfetti } from "@/lib/confetti";
import { useEffect, useState } from "react";
import { VerifyPlanPayment } from "@/Hooks/Payment";




export default function PlanUpgradeSuccess() {


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    // api call
    const { mutate: Verify, isPending } = VerifyPlanPayment();

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



    return (



        <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-orange-100 flex items-center justify-center px-4 py-10">


            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl"
            >
                <Card className="rounded-3xl shadow-xl border border-yellow-100 overflow-hidden">

                    {/* Top Glow Banner */}
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 h-2 w-full" />

                    <CardContent className="p-6 sm:p-8">

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                            className="flex justify-center mb-4"
                        >
                            <div className="bg-yellow-100 p-4 rounded-full relative">
                                <Crown className="text-yellow-600 w-10 h-10" />
                                <CheckCircle2 className="absolute -bottom-1 -right-1 bg-white rounded-full text-green-500 w-5 h-5" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
                            Plan Upgraded Successfully 🚀
                        </h1>

                        {/* Subtitle */}
                        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                            You now have access to{" "}
                            <span className="font-semibold text-orange-600">
                                premium features
                            </span>
                            .
                            <br />
                            Enjoy enhanced experience and unlock more opportunities.
                        </p>

                        {/* Divider */}
                        <div className="my-6 border-t" />


                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8"
                        >
                            <Button
                                onClick={() => navigate("/")}
                                className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white py-5 flex items-center justify-center gap-2"
                            >
                                Go to Home
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </motion.div>

                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}