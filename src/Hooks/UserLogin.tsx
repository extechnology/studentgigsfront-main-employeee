import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RegisterUser, LoginUser, GoogleLogin, PostEmailVerification, PostResendOtp, PostResetPassword, PostMobileOtpVerify, PostMobileOtp } from "@/Service/AllApi"



// Register User 
export const UserRegister = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await RegisterUser(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },

        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });

        },
        onError: (error) => {
            console.error("Failed to Resister User:", error);
            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });
        },


    })


}




// Email Verification 
export const EmailVerification = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await PostEmailVerification(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },

        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });

        },
        onError: (error) => {
            console.error("Failed to Email Verification", error);
            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });
        },

    })


}




// Reset Password
export const ResetPassword = () => {

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await PostResetPassword(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {

            console.error("Failed to Reset Password", error);

        },
    })


}





// Resend Otp
export const ResendOtp = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await PostResendOtp(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },

        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });

        },
        onError: (error) => {
            console.error("Failed to Resend Otp", error);
            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });
        },

    })


}



// Login User 
export const UserLogin = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await LoginUser(data)

                return Response

            } catch (err) {

                console.log(err);

            }

        },
        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });

        },
        onError: (error) => {
            console.error("Failed to Login User:", error);
            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });
        },

    })

}




// Google Auth
export const GoogleAuth = () => {

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await GoogleLogin(data)

                return Response

            } catch (err) {

                console.log(err);

            }

        }

    })

}





// Mobile Otp Request
export const useMobileOtp = () => {

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await PostMobileOtp(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Verify Email", error);
        },

    })

}




// Verify Mobile Otp
export const useVerifyMobileOtp = () => {

    return useMutation({

        mutationFn: async (data: any) => {

            try {

                const Response = await PostMobileOtpVerify(data)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Verify Email", error);
        },

    })

}