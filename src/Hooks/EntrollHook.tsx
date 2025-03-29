import { PostEnrollForm } from "@/Service/AllApi";
import { useMutation  } from "@tanstack/react-query";




// Submit Entroll Form
export const SubmitEnroll = () => {

    return useMutation({

        mutationFn: async (formData : FormData) => {

            try {

                const Response = await PostEnrollForm(formData)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Submit FormData:", error);
        },

    })

}