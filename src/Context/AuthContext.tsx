import { createContext, useContext, useEffect, useState } from "react";
import { UserPlans } from "@/Hooks/Userplans";


// Plan & Usage Data Type
export interface PlanData {
    plan_id: number;
    id: string;
    name: string;
    price: number;
    job_applications: number;
    validity: string;
    profile_visibility_to_employers: string;
    resume_builder: string;
    job_alerts_and_notifications: string;
    saved_jobs: string;
    workplace_essentials_certified_course: string;
    priority_shortlisting_by_employers: string;
    premium_profile_badge : string
    live_chat_with_employers: string;
}



// Usage Data Type
interface UsageData {
    jobs_applied: number;
    created_date?: string; // Plan activation date
    expire_date?: string; // Plan expiration date
    resume_builder: number;
    job_limit:boolean
}




// Context Type
interface AuthContextType {
    isAuthenticated: boolean;
    plan: PlanData | null;
    currentPlan: string | null;
    usage: UsageData | null;
    isPlanExpired: boolean;
    isoffer: boolean;
    isLoadingPlan: boolean;
    isFetchingPlan: boolean;
    isErrorPlan: boolean;
    login: (token: string) => void;
    logout: () => void;
    refetchPlan: () => void; // Function to refetch plan when upgraded
}



// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);



// Helper function to check if token is valid
const checkAuth = (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};



// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuth());


    // Fetch user plans
    const { data, refetch: refetchPlan, isLoading: isLoadingPlan, isFetching: isFetchingPlan, isError: isErrorPlan } = UserPlans();


    // Extract plan and usage details
    const plan = data?.plan ?? null;
    const currentPlan = data?.current_plan ?? null;
    const usage = data?.usage ?? null;
    const isoffer = data?.is_offer ?? false;



    // Plan Expiration Check
    const Expired = (() => {
        if (!usage?.expire_date) return false; // If no expiration date, assume valid
        return new Date(usage.expire_date).getTime() < Date.now();
    })();



    // Auto-fetch plan data when authentication state changes
    useEffect(() => {
        if (isAuthenticated) {
            refetchPlan();
        }
    }, [isAuthenticated]);



    //Update `isAuthenticated` when localStorage changes (real-time)
    useEffect(() => {


        const syncAuth = () => {

            const authStatus = checkAuth();
            setIsAuthenticated(checkAuth());
            if (!authStatus) refetchPlan();

        }

        window.addEventListener("storage", syncAuth);

        // Also update state whenever localStorage changes inside the same tab
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function (key, value) {
            originalSetItem.call(this, key, value);
            if (key === "token") syncAuth(); // Update state immediately when token is set
        };

        return () => {
            window.removeEventListener("storage", syncAuth);
            localStorage.setItem = originalSetItem; // Reset original behavior on unmount
        };


    }, []);



    // Login
    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        refetchPlan(); // Fetch plan immediately after login
        window.dispatchEvent(new Event("storage")); // Manually trigger storage event
    };



    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        refetchPlan(); // Fetch plan immediately after login
        window.dispatchEvent(new Event("storage")); // Ensure logout syncs across tabs
    };



    return (
        <AuthContext.Provider value={{ isAuthenticated, isoffer, login, logout, plan, refetchPlan, currentPlan, usage, isPlanExpired: Expired, isLoadingPlan, isFetchingPlan, isErrorPlan }}>
            {children}
        </AuthContext.Provider>
    );


};



// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
