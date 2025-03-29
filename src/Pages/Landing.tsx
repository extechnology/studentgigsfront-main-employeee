import Hero from "@/Components/Home/Hero";
import TrendingJobs from "@/Components/Home/TrendingJobs";
import PopluarJobs from "@/Components/Home/PopluarJobs";
import About from "@/Components/Home/About";
import WelcomeModal from "@/Components/GigsAcademy/WelcomeModal.tsx";
import { useGoogleOneTapLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from "@/Context/AuthContext";
import { GoogleAuth } from "@/Hooks/UserLogin";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";


export default function Landing() {


  // Query client
  const queryclient = useQueryClient();


  // Google AUTH
  const { mutate: mutateGoogleLogin } = GoogleAuth();


  // Context auth
  const { login, isAuthenticated } = useAuth();


  // Scroll to top when page is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);




  // Track if the popup has been shown using localStorage
  const [hasShownPopup, setHasShownPopup] = useState(() => {

    return localStorage.getItem('hasShownGooglePopup') === 'true';

  });



  // Function to mark popup as shown
  const markPopupAsShown = () => {
    setHasShownPopup(true);
    localStorage.setItem('hasShownGooglePopup', 'true');
  };



  // Function to reset popup state
  const resetPopupState = () => {
    setHasShownPopup(false);
    localStorage.removeItem('hasShownGooglePopup');
  };




  // Handle successful login
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {


    if (isAuthenticated) return;

    try {


      if (!credentialResponse.credential) {
        toast.error("Login failed - no credentials received");
        return;
      }

      const token = credentialResponse.credential;
      const tokenParts = token.split(".");

      if (tokenParts.length !== 3) {
        toast.error("Invalid token received");
        return;
      }

      const payload = JSON.parse(atob(tokenParts[1]));

      const formdata = new FormData();
      formdata.append("username", payload.name);
      formdata.append("email", payload.email);

      mutateGoogleLogin(formdata, {

        onSuccess: (response) => {

          if (response.status >= 200 && response.status <= 300) {

            login(response.data.access);
            toast.success("Login Successful!");
            markPopupAsShown();
            queryclient.invalidateQueries({ queryKey: ["userpersonalinfo"] });

          } else {

            console.error("Login failed:", response);
            toast.error("Login failed. Please try again.");

          }



        },
        onError: (error) => {

          console.error("Login mutation error:", error);
          toast.error("Login failed. Please try again.");

        },
      });

    } catch (error) {

      console.error("One Tap login error:", error);
      toast.error("Login failed. Please try again.");

    }
  }



  // Reset popup state when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      resetPopupState();
    }
  }, [isAuthenticated]);




  // Initialize Google One Tap
  useGoogleOneTapLogin({
    onSuccess: handleLoginSuccess,
    onError: () => {
      console.error("Google One Tap login failed");
      toast.error("Google One Tap Login Failed. Please try again.");
      markPopupAsShown(); // Mark popup as shown even on error
    },
    cancel_on_tap_outside: false,
    prompt_parent_id: 'oneTap',
    disabled: isAuthenticated || hasShownPopup,
  });


  return (

    <>

      <main className="w-full h-full">

        {/* Hero */}
        <div><Hero /></div>

        {/* Trending Jobs */}
        <div><TrendingJobs /></div>

        {/* Popluar Jobs */}
        <div><PopluarJobs /></div>

        {/* About */}
        <div><About /></div>

        {/* Welcome Modal */}
        <WelcomeModal />

      </main>


    </>
  );
}
