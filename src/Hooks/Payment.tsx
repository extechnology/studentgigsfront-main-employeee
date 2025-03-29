import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostCreateOrder, PostVerifyPayment } from "@/Service/AllApi";



// Create Payment Order
export const CreateOrder = () => {


    interface MutationParams {
        formData: FormData;
    }

    return useMutation({

        mutationFn: async ({ formData }: MutationParams) => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await PostCreateOrder(formData, headers)

                return Response

            } catch (err) {

                console.error(err)

            }

        },
        onError: (error) => {
            console.error("Failed to Create Order:", error);
        }
    })

}



// Verify Payment
export const VerifyPayment = () => {

    const queryclient = useQueryClient();


    return useMutation({

        mutationFn: async (data: any) => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await PostVerifyPayment(data, headers)

                return Response

            } catch (err) {

                console.error(err)

            }

        },
        onError: (error) => {
            console.error("Failed to Create Order:", error);
        },
        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["userPlans"] });
            queryclient.invalidateQueries({ queryKey: ["allplans"] });

        }

    })

}