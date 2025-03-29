import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetJobs, GetEmployeer, GetSearchedJobs, PostApplyJob, GetPopularJobs, GetTrendingJobs, GetSavedJobs, PostSavedJobs, DeleteSavedJobs } from "@/Service/AllApi";
import { useAuth } from "@/Context/AuthContext";




// Get Posted Jobs
export const SingleJobData = (id: string, job_type: string) => {

    return useQuery({

        queryKey: ["postedJobs", id, job_type],
        queryFn: async () => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const response = await GetJobs(id, job_type, headers);

                return response.data;

            } catch (err) {

                console.error("Error fetching jobs:", err);
                throw new Error("Failed to fetch jobs");

            }
        },

        staleTime: 1000 * 60 * 10,

    });

}




// Get Popular Jobs
export const PopularJobsList = () => {

    const { isAuthenticated } = useAuth()

    return useQuery({

        queryKey: ["popularjobs"],

        queryFn: async () => {

            try {

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await GetPopularJobs(headers, isAuthenticated)

                return Response.data

            } catch (err) {

                console.log(err);
                return [];

            }

        },

    })

}



// Get Trending Jobs
export const TrendingJobsList = () => {

    return useQuery({

        queryKey: ["trendingjobs"],

        queryFn: async () => {

            try {

                const Response = await GetTrendingJobs()

                return Response.data

            } catch (err) {

                console.log(err);
                return [];

            }

        },

    })

}



// Get Employeer
export const Employeers = () => {

    return useQuery({

        queryKey: ["employeer"],

        queryFn: async () => {

            try {

                const Response = await GetEmployeer()

                return Response.data

            } catch (err) {

                console.log(err);
                return [];

            }

        },
        staleTime: 1000 * 60 * 10,

    })

}



interface GetParams {

    category: string
    location: string
    salary_type: string
    page: number
}



// Get Searched Jobs
export const SerachedJobs = ({ category, location, salary_type, page }: GetParams) => {

    const { isAuthenticated } = useAuth()

    return useQuery({

        queryKey: ["serachedjobs", category, location, salary_type, page],

        queryFn: async () => {

            try {

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await GetSearchedJobs(category, location, salary_type, headers, isAuthenticated, page)

                return Response.data

            } catch (err) {

                console.error("Error fetching searched jobs:", err);
                return [];

            }

        },

    })

}




// Apply Jobs
export const ApplyJob = () => {

    interface MutationParams {
        formData: FormData;
    }

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async ({ formData }: MutationParams) => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await PostApplyJob(formData, headers)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Apply Job:", error);
        },
        onSuccess: () => {
            // queryclient.invalidateQueries({ queryKey: ["userPlans"] });
            queryclient.invalidateQueries({ queryKey: ["postedJobs"] });
            queryclient.invalidateQueries({ queryKey: ["userPlans"] });
            queryclient.invalidateQueries({ queryKey: ["serachedjobs"] });
            queryclient.invalidateQueries({ queryKey: ["popularjobs"] });
        },

    })

}




// Get SavedJobs
export const SavedJobs = () => {

    return useQuery({

        queryKey: ["savedjobs"],
        queryFn: async () => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const response = await GetSavedJobs(headers);

                return response.data;

            } catch (err) {

                console.error("Error fetching jobs:", err);
                throw new Error("Failed to fetch jobs");

            }
        },

        staleTime: 1000 * 60 * 10,

    });

}



// Post SavedJobs
export const SaveSavedJobs = () => {

    interface MutationParams {
        formData: FormData;
    }

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async ({ formData }: MutationParams) => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await PostSavedJobs(formData, headers)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Save Saved Jobs:", error);
        },
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["savedjobs"] });
            queryclient.invalidateQueries({ queryKey: ["serachedjobs"] });

        },

    })

}




// Delete SavedJobs
export const RemoveSavedJobs = () => {


    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, job_type }: { id: number, job_type: string }) => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const Response = await DeleteSavedJobs(id, job_type, headers)

                return Response

            }
            catch (err) {

                console.log(err);

            }

        },
        onError: (error) => {
            console.error("Failed to Delete Saved Jobs:", error);
        },
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["savedjobs"] });
            queryclient.invalidateQueries({ queryKey: ["serachedjobs"] });
        },

    })

}