import { PostEnrollForm, PostVerifyCoursePayment } from "@/Service/AllApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";




// Submit Entroll Form
export const SubmitEnroll = () => {

    return useMutation({

        mutationFn: async (formData: FormData) => {

            if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

            const token = localStorage.getItem("token")

            const headers = { Authorization: `Bearer ${token}` }

            return await PostEnrollForm(formData, headers)

        },

        onError: (error: any) => {

            console.log(error);

            if (error?.response?.data?.error) {
                toast.error(error.response.data.error)
            } else {
                toast.error("Failed to initiate enrollment")
            }


        }

    })

}




// Verify course payment
export const VerifyCoursePayment = () => {

    return useMutation({

        mutationFn: async (formData: FormData) => {

            if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

            const token = localStorage.getItem("token")

            const headers = { Authorization: `Bearer ${token}` }

            return await PostVerifyCoursePayment(formData, headers)

        },

    })

}