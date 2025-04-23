import { lazy, Suspense, ReactNode, useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./Context/AuthContext";
import ProtectedRouteForSavedJobs from "./Components/Common/ProtectedRouteForSavedJobs";
import Loader from "./Components/Loaders/Loader";
import LoginModal from "./Components/LoginModal/Loginmodal";



// Lazy Loaded Pages
const Layout = lazy(() => import("./Pages/Layout"));
const Auth = lazy(() => import("./Pages/Auth"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Landing = lazy(() => import("./Pages/Landing"));
const Contact = lazy(() => import("./Pages/Contact"));
const Settings = lazy(() => import("./Pages/Settings"));
const UserProfile = lazy(() => import("./Pages/UserProfile"));
const Plans = lazy(() => import("./Pages/Plans"));
const GigsAcademy = lazy(() => import("./Pages/GigsAcademy"));
const PlanUsageDashboard = lazy(() => import("./Pages/Usage"));


// Job-Related Pages
const JobPages = {
  JobFilter: lazy(() => import("./Pages/JobFilter")),
  JobDetails: lazy(() => import("./Pages/JobDeatils")),
  ApplyJob: lazy(() => import("./Pages/ApplyJob")),
  JobApplySuccess: lazy(() => import("./Pages/JobApplySuccess")),
  SavedJobs: lazy(() => import("./Pages/SavedJobs")),
};



// Employer Pages
const EmployerPages = {
  EmployerDetails: lazy(() => import("./Pages/EmployerDeatils")),
};



// Legal Pages
const LegalPages = {
  Terms: lazy(() => import("./Pages/Terms")),
  LoginTerms: lazy(() => import("./Pages/LoginTerms")),
  Refund: lazy(() => import("./Pages/Refund")),
  Privacy: lazy(() => import("./Pages/Privacy")),
};



// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/auth" state={{ from: location }} />;
};



function App() {


  // Authentication
  const { isAuthenticated } = useAuth();


  // Login Modal
  const [isOpen, setIsOpen] = useState(false);



  // Login Modal Open 
  useEffect(() => {
    
    if (!isAuthenticated && !sessionStorage.getItem("loginModalShown")) {

      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("loginModalShown", "true");
      }, 10000);

      return () => clearTimeout(timer);

    }

  }, [isAuthenticated]);




  return (


    <>

      <Suspense fallback={<Loader />} >

        <Routes>

          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />


          <Route element={<Layout />}>

            <Route path="/" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobfilter" element={<JobPages.JobFilter />} />
            <Route path="/gigsskillacademy" element={<GigsAcademy />} />
            <Route path="/termscondition" element={<LegalPages.Terms />} />
            <Route path="/refundpolicy" element={<LegalPages.Refund />} />
            <Route path="/privacypolicy" element={<LegalPages.Privacy />} />
            <Route path="/loginterms" element={<LegalPages.LoginTerms />} />


            {/* Protected Routes */}
            <Route path="/savedjobs" element={<ProtectedRouteForSavedJobs><JobPages.SavedJobs /></ProtectedRouteForSavedJobs>} />

            <Route path="/planusage" element={<ProtectedRoute><PlanUsageDashboard /></ProtectedRoute>} />

            <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />

            <Route path="/jobapplysuccess" element={<ProtectedRoute><JobPages.JobApplySuccess /></ProtectedRoute>} />

            <Route path="/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

            <Route path="/employerdeatils/:id" element={<ProtectedRoute><EmployerPages.EmployerDetails /></ProtectedRoute>} />

            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            <Route path="/applyjob/:id/:jobType" element={<ProtectedRoute><JobPages.ApplyJob /></ProtectedRoute>} />

            <Route path="/jobdeatils/:id/:jobType" element={<ProtectedRoute><JobPages.JobDetails /></ProtectedRoute>} />


          </Route>

        </Routes>

      </Suspense>

      <Toaster position="top-center" />


      {/* Login Modal */}
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />

    </>

  );
}

export default App;
