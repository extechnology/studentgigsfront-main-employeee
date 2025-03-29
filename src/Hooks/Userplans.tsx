import { useQuery } from "@tanstack/react-query";
import { GetUserPlans , GetAllPlans } from "@/Service/AllApi";




// Get All Plans
export const AllPlans = () => {

    return useQuery({

        queryKey: ["allplans"],
        queryFn: async () => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const response = await GetAllPlans(headers);

                return response.data;

            } catch (err) {

                console.error("Error fetching jobs:", err);
                throw new Error("Failed to fetch jobs");

            }
        },

    });

}



// Get  User Plans
export const UserPlans = () => {

    return useQuery({

        queryKey: ["userPlans"],
        queryFn: async () => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const response = await GetUserPlans(headers);

                return response.data;

            } catch (err) {

                console.error("Error fetching jobs:", err);
                throw new Error("Failed to fetch jobs");

            }
        },

    });

}