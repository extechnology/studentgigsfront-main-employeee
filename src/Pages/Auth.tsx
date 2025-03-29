import { UserRegister, UserLogin, GoogleAuth } from "@/Hooks/UserLogin";
import { useState } from "react";
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/Context/AuthContext";
import { Eye, EyeOff } from "lucide-react";


export default function Auth() {


  type Inputs = {
    email: string
    password: string
    repassword: string
    username: string
    termsAccepted: boolean
  }


  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);


  const Navigate = useNavigate()


  // Get the current path
  const location = useLocation();


  // Login and register status
  const [Status, SetStatus] = useState(true)


  // Terms acceptance state
  const [termsAccepted, setTermsAccepted] = useState(false)


  // React Hook Form state
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()


  // Scroll to top when page is loaded
  window.scrollTo({ top: 0, behavior: 'smooth', });


  // Mutate for user Register
  const { mutate } = UserRegister()


  // Mutate for user Login
  const { mutate: mutateLogin } = UserLogin()


  // Mutate for Google Login
  const { mutate: mutateGoogleLogin } = GoogleAuth()


  // login Provider
  const { login } = useAuth()



  // Submit Register
  const SubmitRegister = (data: any) => {

    if (!termsAccepted) {
      toast.error("Please accept the Terms and Conditions to continue.");
      return;
    }

    const formdata = new FormData()

    formdata.append("email", data.email)
    formdata.append("username", data.username)
    formdata.append("password", data.password)
    formdata.append("password_confirm", data.repassword)


    // Mutate
    mutate(formdata, {

      onSuccess: (response) => {

        if (response.status >= 200 && response.status <= 300) {

          toast.success("User Register Successfully")

          SetStatus(!Status)

          reset()
          setTermsAccepted(false)

        }
        else {

          console.log(response)

          reset()

          handleErrors(response?.response?.data);

        }

      }

    })

    // Function to handle and display errors
    const handleErrors = (errors: any) => {
      if (!errors) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (typeof errors === "string") {
        // If the error is a simple string, show it directly
        toast.error(errors);
      } else if (errors.detail) {
        // Handle specific "detail" key errors
        toast.error(errors.detail);
      } else if (Array.isArray(errors)) {
        // Handle an array of errors
        errors.forEach((message: string) => {
          toast.error(message);
        });
      } else if (typeof errors === "object") {
        // Handle object-based errors (like field validation errors)
        Object.entries(errors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            console.log(key);
            value.forEach((message: string) => toast.error(message));
          } else {
            toast.error(value as string);
          }
        });
      } else {
        toast.error("An unknown error occurred.");
      }
    };


  }




  // Submit Login
  const SubmitLogin = (data: any) => {
    if (!termsAccepted) {
      toast.error("Please accept the Terms and Conditions to continue.");
      return;
    }

    const formdata = new FormData()

    formdata.append("username", data.username)
    formdata.append("password", data.password)


    // Mutate
    mutateLogin(formdata, {

      onSuccess: (response) => {

        if (response.status >= 200 && response.status <= 300) {

          toast.success("User Login Successfully")

          // Get previous route or default to home
          const from = location.state?.from?.pathname || "/";


          reset()
          setTermsAccepted(false)


          login(response.data.access)


          Navigate(from, { replace: true })



        }
        else {

          console.log(response)

          handleErrors(response?.response?.data);

        }

      }

    })

    // Function to handle and display errors
    const handleErrors = (errors: any) => {
      if (!errors) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (typeof errors === "string") {
        // If the error is a simple string, show it directly
        toast.error(errors);
      } else if (errors.detail) {
        // Handle specific "detail" key errors
        toast.error(errors.detail);
      } else if (Array.isArray(errors)) {
        // Handle an array of errors
        errors.forEach((message: string) => {
          toast.error(message);
        });
      } else if (typeof errors === "object") {
        // Handle object-based errors (like field validation errors)
        Object.entries(errors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            console.log(key);
            value.forEach((message: string) => toast.error(message));
          } else {
            toast.error(value as string);
          }
        });
      } else {
        toast.error("An unknown error occurred.");
      }
    };


  }



  // Google Login
  const GoogleLogin = useGoogleLogin({

    onSuccess: async (tokenResponse) => {
      if (!termsAccepted) {
        toast.error("Please accept the Terms and Conditions to continue.");
        return;
      }

      try {

        const AccessToken = tokenResponse.access_token


        // Getting User Info Form Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        });


        if (!userInfoResponse.ok) {

          toast.error("Something went wrong. Please try again.")

          throw new Error('Failed to fetch user info');


        }
        else {

          const userInfo = await userInfoResponse.json();

          const formdata = new FormData()

          formdata.append("username", userInfo.name)
          formdata.append("email", userInfo.email)


          // Mutate
          mutateGoogleLogin(formdata, {

            onSuccess: (response) => {

              if (response.status >= 200 && response.status <= 300) {

                // Get previous route or default to home
                const from = location.state?.from?.pathname || "/";

                login(response.data.access)

                toast.success("Login Successful..!")

                setTermsAccepted(false)

                Navigate(from, { replace: true })

              }
              else {

                console.log(response)

                toast.error("Something went wrong. Please try again.")

              }

            }

          })

        }

      } catch (err) {

        console.log(err);

      }

    },
    onError(errorResponse) {

      console.log(errorResponse);

      toast.error("Google Login Failed. Please try again.")

    },

  })


  return (


    <>


      <main className="w-full h-full bg-slate-50/25">


        <div className="flex flex-wrap">


          <div className="flex w-full flex-col md:w-1/2">

            <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
              <Link to="/" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900 sm:mb-28 mb-3"> StudentsGigs </Link>
            </div>


            {/* Login */}
            {

              Status ?

                // Login 
                <div className="lg:w-[28rem] w-[19rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">

                  <p className="text-left text-3xl font-bold">Welcome Back</p>



                  <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(SubmitLogin)}>



                    {/* Username */}
                    <div className="flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input type="text" id="login-username" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Username"

                          {...register("username", { required: "Username is required" })}

                        />
                        {errors.username && <p role="alert" className="text-red-500 text-sm">{errors.username.message}</p>}
                      </div>
                    </div>




                    {/*Password */}
                    <div className="mb-6 flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input type={showPassword ? "text" : "password"} id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password"

                          {...register("password", { required: "Password is required" })}

                        />

                        <button
                          type="button"
                          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye size={20} /> :  <EyeOff size={20} />}
                        </button>

                        {errors.password && <p role="alert" className="text-red-500 text-sm">{errors.password.message}</p>}
                      </div>
                    </div>



                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className={`peer hidden`}
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label
                        htmlFor="terms"
                        className={`h-4 w-4 border-2 border-gray-300 rounded flex items-center justify-center hover:cursor-pointer transition-all
      ${termsAccepted ? "bg-black border-black" : "bg-white border-gray-300"}`}
                      >
                        {termsAccepted && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </label>
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I accept the <Link to={'/loginterms'} className="text-gray-900 underline">Terms and Conditions</Link>
                      </label>
                    </div>



                    <button
                      type="submit"
                      className={`w-full rounded-lg ${!termsAccepted ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900'} px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2`}
                    >
                      Log in
                    </button>


                  </form>


                  <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                    <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
                  </div>



                  <button
                    onClick={() => GoogleLogin()}
                    className={`shadow-md mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!termsAccepted}
                  >
                    <img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="google-icon" /> Log in with Google
                  </button>


                  <div className="py-12 text-center">
                    <p className="whitespace-nowrap text-gray-600">
                      Don't have an account?
                      <a onClick={() => SetStatus(!Status)} className="cursor-pointer underline-offset-4 font-semibold text-gray-900 underline ms-3">Sign up.</a>
                    </p>
                  </div>


                </div>


                :


                // Register Section
                <div className="lg:w-[28rem] w-[19rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">


                  <p className="text-left text-3xl font-bold">Register Here</p>
                  <p className="mt-2 text-left text-gray-500">please enter your details.</p>


                  <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(SubmitRegister)}>


                    {/* Username */}
                    <div className="flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input type="text" id="login-username" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Username"

                          {...register("username", { required: "Username is required" })}

                        />
                        {errors.username && <p role="alert" className="text-red-500 text-sm">{errors.username.message}</p>}
                      </div>
                    </div>



                    {/* Email */}
                    <div className="flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input type="email" id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email"

                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address"
                            }
                          })}


                        />
                        {errors.email && <p role="alert" className="text-red-500 text-sm">{errors.email.message}</p>}
                      </div>
                    </div>



                    {/* Password */}
                    <div className="flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="login-password"
                          className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="Password"
                          {...register("password", { required: "Password is required" })}
                        />
                        <button
                          type="button"
                          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye size={20} /> :  <EyeOff size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p role="alert" className="text-red-500 text-sm">{errors.password.message}</p>
                      )}
                    </div>



                    {/* Re-enter Password */}
                    <div className="mb-6 flex flex-col pt-4">
                      <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                        <input
                          type={showRePassword ? "text" : "password"}
                          id="repassword"
                          className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="Re-enter Password"
                          {...register("repassword", { required: "Re-enter Password is required" })}
                        />
                        <button
                          type="button"
                          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          {showRePassword ? <Eye size={20} /> :  <EyeOff size={20} />}
                        </button>
                      </div>
                      {errors.repassword && (
                        <p role="alert" className="text-red-500 text-sm">{errors.repassword.message}</p>
                      )}
                    </div>



                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className={`peer hidden`}
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label
                        htmlFor="terms"
                        className={`h-4 w-4 border-2 border-gray-300 rounded flex items-center justify-center hover:cursor-pointer transition-all
      ${termsAccepted ? "bg-black border-black" : "bg-white border-gray-300"}`}
                      >
                        {termsAccepted && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </label>
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I accept the <Link to={'/loginterms'} className="text-gray-900 underline">Terms and Conditions</Link>
                      </label>
                    </div>



                    <button
                      type="submit"
                      className={`w-full rounded-lg ${!termsAccepted ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900'} px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2`}
                    >
                      Sign Up
                    </button>


                  </form>


                  <div className="py-12 text-center">
                    <p className="whitespace-nowrap text-gray-600">
                      Already have an account?
                      <a onClick={() => SetStatus(!Status)} className="underline-offset-4 font-semibold text-gray-900 underline ms-3 cursor-pointer">Log In.</a>
                    </p>
                  </div>


                </div>

            }

          </div>


          {/* Image Section */}
          <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
            <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
              <p className="mb-5 text-3xl font-semibold leading-10"> Our mission is to make students independent, responsible, and equipped
                with practical exposure while learning.</p>
              <p className="mb-4 text-3xl font-semibold">Students Gigs</p>
              <p className="">Founder, CEO Dr Vimal K R</p>
              <p className="mb-7 text-sm opacity-70">Medresearch India Pvt Ltd</p>
            </div>
            <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" loading="lazy" src="https://www.shutterstock.com/image-photo/university-graduation-ceremonies-on-commencement-600nw-298297430.jpg" />
          </div>


        </div>




      </main>

    </>


  )
}