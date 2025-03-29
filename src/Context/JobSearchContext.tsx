import React, { createContext, useContext, useEffect, useState } from 'react';
import { SerachedJobs } from '@/Hooks/JobHook';
import { useAuth } from './AuthContext';


// search params types
interface SearchParams {
    category: string;
    location: string;
    salary_type: string;
    page: number;
}


// context types
interface JobSearchContextType {
    searchParams: SearchParams;
    updateSearchParams: (params: Partial<SearchParams>) => void;
    searchResults: any;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}


// context
const JobSearchContext = createContext<JobSearchContextType | undefined>(undefined);


export function JobSearchProvider({ children }: { children: React.ReactNode }) {


    // To check if the user is authenticated
    const { isAuthenticated } = useAuth();
    

    // search params
    const [searchParams, setSearchParams] = useState<SearchParams>({
        category: "",
        location: "",
        salary_type: "",
        page: 1,
    });


    // serached jobs
    const { data, isLoading, isError, isFetching, refetch } = SerachedJobs(searchParams);


    // update search params
    const updateSearchParams = (params: Partial<SearchParams>) => {
        setSearchParams((prev) => ({ ...prev, ...params }));
    };


    // Refetch data when `isAuthenticated` changes
    useEffect(() => {

        refetch();

    }, [isAuthenticated, refetch]);


    return (
        <JobSearchContext.Provider
            value={{
                searchParams,
                updateSearchParams,
                searchResults: data,
                isLoading,
                isFetching,
                isError,
                page: searchParams.page,
                setPage: (page) => setSearchParams((prev) => ({ ...prev, page })),
                totalPages: data?.total_pages || 1,
            }}
        >
            {children}
        </JobSearchContext.Provider>
    );

}


export const useJobSearch = () => {
    const context = useContext(JobSearchContext);
    if (!context) {
        throw new Error('useJobSearch must be used within a JobSearchProvider');
    }
    return context;
};
