import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUniversityList, GetFeildOfStudy, GetJobList, GetHomeSlider, GetLocations, GetJobTitle, GetAllSearchCategory, GetNotifications, PutMarkAllAsRead, DeleteAllNotifications, GetCourseData } from "@/Service/AllApi";




// Get UniversityList
export const UniversityList = (search: string) => {

    return useQuery({

        queryKey: ["universitylist", search],

        queryFn: async () => {

            const Response = await GetUniversityList(search)

            return Response?.data?.map((uni: any) => ({ value: uni.name, label: uni.name })) || [];

        },
        staleTime: 1000 * 60 * 10,
        enabled: !!search

    })

}





// Get Feild of Study
export const FeildOfStudyList = () => {

    return useQuery({

        queryKey: ["feildofstudylist"],

        queryFn: async () => {

            if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

            const token = localStorage.getItem("token")

            const headers = { Authorization: `Bearer ${token}` }

            const Response = await GetFeildOfStudy(headers)

            return Response.data

        },
        staleTime: 1000 * 60 * 10,

    })

}






// Get job category
export const JObList = () => {

    return useQuery({

        queryKey: ["joblist"],

        queryFn: async () => {

            const Response = await GetJobList()

            return Response.data

        },
        staleTime: 1000 * 60 * 10,

    })

}




// Get all search category
export const AllSearchCategory = () => {

    return useQuery({

        queryKey: ["allsearchcategory"],

        queryFn: async () => {

            const Response = await GetAllSearchCategory()

            return Response.data

        },
        staleTime: 1000 * 60 * 10,

    })

}





// Get job tittles
export const JObTittles = () => {

    return useQuery({

        queryKey: ["jobtittles"],

        queryFn: async () => {


            const Response = await GetJobTitle()

            return Response.data

        },
        staleTime: 1000 * 60 * 10,

    })

}




// Get Home Slider
export const HomeSlider = () => {

    return useQuery({

        queryKey: ["HomeSlider"],

        queryFn: async () => {


            const Response = await GetHomeSlider()

            return Response.data


        },

    })

}




// Get All Locations
export const AllLocations = (search: string) => {

    return useQuery({

        queryKey: ["AllLocations", search],

        queryFn: async () => {

            const response = await GetLocations(search);

            return response.data.features.map((location: any) => {

                const properties = location.properties;
                const coordinates = location.geometry.coordinates;

                const city = properties.city || properties.name || "";
                const state = properties.state || "";
                const country = properties.country || "";
                const postalCode = properties.postcode || ""; // Fetching postal code

                return {
                    value: `${coordinates[1]},${coordinates[0]}`, // lat,lng format
                    label: [city, state, country, postalCode].filter(Boolean).join(", "), // Removing empty values
                };

            });

        },
    });
};




// Get Notification
export const NotificationAlert = () => {

    return useQuery({

        queryKey: ["NotificationAlert"],
        queryFn: async () => {

            try {

                if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

                const token = localStorage.getItem("token")

                const headers = { Authorization: `Bearer ${token}` }

                const response = await GetNotifications(headers);

                return response.data;

            } catch (err) {

                console.error("Error fetching Notifications:", err);
                throw new Error("Failed to fetch Notifications");

            }
        },

        staleTime: 1000 * 60 * 10,

    });

}



// Mark As Read Notification
export const MarkAsRead = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: string) => {

            if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

            const token = localStorage.getItem("token")

            const headers = { Authorization: `Bearer ${token}` }

            const Response = await PutMarkAllAsRead(data, headers)

            return Response


        },
        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["NotificationAlert"] });

        },
        onError: (error) => {
            console.error("Failed to Mark As Read Notification:", error);
            queryclient.invalidateQueries({ queryKey: ["NotificationAlert"] });
        },

    })

}






// Clear all Notification
export const ClearAllNotifications = () => {

    const queryclient = useQueryClient();

    return useMutation({

        mutationFn: async (data: string) => {

            if (!localStorage.getItem("token")) { throw new Error("Authentication token not found"); }

            const token = localStorage.getItem("token")

            const headers = { Authorization: `Bearer ${token}` }

            const Response = await DeleteAllNotifications(data, headers)

            return Response

        },
        onSuccess: () => {

            queryclient.invalidateQueries({ queryKey: ["NotificationAlert"] });

        },
        onError: (error) => {
            console.error("Failed to Clear All Notifications:", error);
            queryclient.invalidateQueries({ queryKey: ["NotificationAlert"] });
        },

    })

}



// Get Course Data
export const CourseData = () => {

    return useQuery({

        queryKey: ["CourseData"],
        queryFn: async () => {

            const response = await GetCourseData();

            return response.data;

        },

        staleTime: 1000 * 60 * 10,

    });

}