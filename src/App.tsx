import { lazy, Suspense, ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./Context/AuthContext";
import ProtectedRouteForSavedJobs from "./Components/Common/ProtectedRouteForSavedJobs";
import Loader from "./Components/Loaders/Loader";



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


  return (


    <>



      <Routes>

        {/* Public Routes */}
        <Route path="/auth" element={<Suspense fallback={<Loader />}><Auth /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<Loader />}><NotFound /></Suspense>} />


        <Route element={<Suspense fallback={<Loader />}><Layout /></Suspense>}>

          <Route path="/" element={<Suspense fallback={<Loader />}><Landing /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<Loader />}><Contact /></Suspense>} />
          <Route path="/jobfilter" element={<Suspense fallback={<Loader />}><JobPages.JobFilter /></Suspense>} />
          <Route path="/gigsskillacademy" element={<Suspense fallback={<Loader />}><GigsAcademy /></Suspense>} />
          <Route path="/termscondition" element={<Suspense fallback={<Loader />}><LegalPages.Terms /></Suspense>} />
          <Route path="/refundpolicy" element={<Suspense fallback={<Loader />}><LegalPages.Refund /></Suspense>} />
          <Route path="/privacypolicy" element={<Suspense fallback={<Loader />}><LegalPages.Privacy /></Suspense>} />
          <Route path="/loginterms" element={<Suspense fallback={<Loader />}><LegalPages.LoginTerms /></Suspense>} />


          {/* Protected Routes */}
          <Route path="/savedjobs" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRouteForSavedJobs><JobPages.SavedJobs /></ProtectedRouteForSavedJobs>
            </Suspense>
          } />


          <Route path="/plans" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><Plans /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/jobapplysuccess" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><JobPages.JobApplySuccess /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/userprofile" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><UserProfile /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/employerdeatils/:id" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><EmployerPages.EmployerDetails /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/settings" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><Settings /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/applyjob/:id/:jobType" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><JobPages.ApplyJob /></ProtectedRoute>
            </Suspense>
          } />


          <Route path="/jobdeatils/:id/:jobType" element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute><JobPages.JobDetails /></ProtectedRoute>
            </Suspense>
          } />


        </Route>

      </Routes>


      <Toaster position="top-center" />

    </>

  );
}

export default App;
