import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RegisterUser, LoginUser, GoogleLogin } from "@/Service/AllApi"



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