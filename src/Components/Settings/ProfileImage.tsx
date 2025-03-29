import React, { useEffect, useState } from "react";
import ImageCropper from "./ImageCropper";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { GetProfilePicture, EditProfilePicture } from "@/Hooks/UserProfile";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";



// Input interface types
interface Inputs {
    cover_photo: string;
    profile_pic: string;
}



// Allowed image Types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB




const ProfileEditor: React.FC = () => {


    // Plan Details
    const { plan, isPlanExpired } = useAuth()


    // Form State 
    const { setValue } = useForm<Inputs>();



    // Get Profile Picture Data
    const { data, isLoading, isError, isPending, isFetching } = GetProfilePicture();



    // Edit Profile Picture
    const { mutate: EditProfilePic, isPending: EditProfilePicPending } = EditProfilePicture();



    // State Croped image
    const [bannerSrc, setBannerSrc] = useState<string>('');
    const [profileSrc, setProfileSrc] = useState<string>('');
    const [showBannerCropper, setShowBannerCropper] = useState(false);
    const [showProfileCropper, setShowProfileCropper] = useState(false);
    const [tempBannerSrc, setTempBannerSrc] = useState('');
    const [tempProfileSrc, setTempProfileSrc] = useState('');
    const [Id, SetId] = useState('');




    // SetDefault Values
    useEffect(() => {
        if (data) {

            const SelectedData = data[0];

            setProfileSrc(SelectedData?.profile_pic);
            setBannerSrc(SelectedData?.cover_photo);
            SetId(SelectedData?.id)
        }
    }, [data])





    // Handle file validation
    const validateFile = (file: File) => {

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {

            toast.error("Invalid file type. Please upload JPEG, PNG, GIF, or WEBP.");
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {

            toast.error("File size too large. Max size is 5MB.");
            return false;
        }
        return true;
    }



    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'profile') => {

        const file = e.target.files?.[0];

        if (!file || !validateFile(file)) {
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (type === 'banner') {
                setTempBannerSrc(reader.result as string);
                setShowBannerCropper(true);
            } else {
                setTempProfileSrc(reader.result as string);
                setShowProfileCropper(true);
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };




    // Handle image apply croped images
    const handleImageApply = (croppedImage: string, type: 'banner' | 'profile') => {
        if (type === 'banner') {
            setBannerSrc(croppedImage);
            setValue("cover_photo", croppedImage);
            setShowBannerCropper(false);
        } else {
            setProfileSrc(croppedImage);
            setValue("profile_pic", croppedImage);
            setShowProfileCropper(false);
        }
    }




    // Handle crop complete
    const handleCropComplete = (croppedImage: string, type: 'banner' | 'profile') => {

        if (type === 'banner') {
            submitProfileData({ cover_photo: croppedImage, profile_pic: "" });
        } else {
            submitProfileData({ cover_photo: "", profile_pic: croppedImage });
        }
    }




    // Submit form data
    const submitProfileData = (data: Inputs) => {


        const formData = new FormData();

        if (data.cover_photo) {

            formData.append("cover_photo", base64ToFile(data.cover_photo, "cover_photo.png"));
            formData.append("profile_pic", "");

        } else {

            formData.append("profile_pic", base64ToFile(data.profile_pic, "profile_pic.png"));
            formData.append("cover_photo", "");

        }


        EditProfilePic({ formData: formData, id: Id }, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {
                    toast.success("Image Updated Successfully...!")
                    setTempBannerSrc('');
                } else {

                    setTempBannerSrc('');
                    setBannerSrc('');
                    toast.error("Something went wrong. Please try again Later.");
                }

            },
            onError: (error) => {
                toast.error("An error occurred: " + error.message);
                setTempBannerSrc('');


            }
        })

    }



    // Base64 to File
    const base64ToFile = (base64String: string, fileName: string) => {

        const regex = /^data:(.+?);base64,(.+)$/;
        const matches = base64String.match(regex);

        if (!matches) {
            throw new Error("Invalid Base64 string.");
        }

        const mime = matches[1];
        const base64Data = matches[2];

        const bstr = atob(base64Data);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    };




    return (


        <section className="w-full m-auto px-1 sm:px-14 pb-10">


            {

                isLoading || isError || isPending || isFetching || EditProfilePicPending ?


                    // Loading Screen
                    <div>

                        <div className="relative h-[20vh] md:h-[25vh] lg:h-[39vh] rounded-lg md:rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse" />

                        <div className="flex justify-start space-x-4 -mt-6 sm:-mt-10 sm:ms-8 ms-2">
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-24 md:w-32 md:h-32">
                                    <div className="w-full h-full rounded-full bg-gray-200 animate-pulse border-4 border-white shadow-lg" />
                                </div>
                            </div>

                            <div className="md:pt-12 pt-8">
                                <div className="h-3 w-32 bg-gray-200 rounded-md animate-pulse mb-2" />
                                <div className="h-3 w-24 bg-gray-200 rounded-md animate-pulse" />
                            </div>
                        </div>

                    </div>

                    :


                    <div>


                        {/* Banner Image */}
                        <div className="relative group h-[20vh] md:h-[25vh] lg:h-[45vh] rounded-lg  md:rounded-2xl lg:rounded-3xl ">
                            <img
                                src={bannerSrc || "/Cover-def.jpg"}
                                alt="banner"
                                loading="lazy"
                                className="w-full h-full object-cover rounded-lg md:rounded-2xl lg:rounded-3xl"
                            />
                            <label htmlFor="banner-upload" className="rounded-lg md:rounded-2xl lg:rounded-3xl absolute inset-0 cursor-pointer group-hover:bg-black/30 flex items-center justify-center transition-all duration-200">
                                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-white shadow-md sm:w-12 sm:h-12 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                                    <Pencil size={20} className="text-gray-700" />
                                </div>
                            </label>
                            <input type="file" id="banner-upload" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'banner')} />
                        </div>



                        {/* Profile Image */}
                        <div className="flex justify-start space-x-4 -mt-6 sm:-mt-10 sm:ms-8 ms-2">

                            <div className="flex items-center gap-4">


                                <div className="relative group">

                                    {/* Shimmer border effect for premium users */}
                                    {!isPlanExpired && plan?.premium_profile_badge.toLowerCase() === "yes" && (
                                        <div className="absolute inset-0 rounded-full border-shimmer"></div>
                                    )}

                                    <div className="relative w-24 h-24 md:w-32 md:h-32">

                                        <img
                                            src={profileSrc || "/Profile-deaf.jpg"}
                                            alt="profile"
                                            loading="lazy"
                                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                        />

                                        {/* Premium Badge */}
                                        {!isPlanExpired && plan?.premium_profile_badge.toLowerCase() === "yes" && (

                                            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 overflow-hidden rounded-full shadow-lg border-2 border-white">
                                                <div className="premium-badge bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold py-1 px-3 flex items-center gap-1 relative overflow-hidden">
                                                    {/* Shimmer effect overlay */}
                                                    <div className="shimmer-effect"></div>

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                                                    </svg>
                                                    PREMIUM
                                                </div>
                                            </div>

                                        )}

                                        <label htmlFor="profile-upload" className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all cursor-pointer">
                                            <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                                                <Pencil className="sm:w-8 sm:h-8 w-6 h-6 text-white" />
                                            </div>
                                        </label>
                                        <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'profile')} />
                                    </div>


                                </div>


                            </div>

                            <div className="md:pt-12 pt-8">
                                <h1 className="font-semibold text-md md:text-lg">{data[0]?.employee_name}</h1>
                                <p className="font-[1rem] text-md md:text-lg text-gray-400">
                                    {data[0]?.job_title}
                                </p>
                            </div>


                        </div>



                        {/* Banner Cropper Modal */}
                        {showBannerCropper && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg w-11/12 max-w-2xl">
                                    <h2 className="text-xl font-bold mb-4">Crop Banner Image</h2>
                                    <ImageCropper
                                        src={tempBannerSrc}
                                        onCrop={(croppedImage) => handleImageApply(croppedImage, 'banner')}
                                        onCropComplete={(croppedImage) => handleCropComplete(croppedImage, 'banner')}
                                        aspectRatio={16 / 9}
                                    />
                                    <button onClick={() => setShowBannerCropper(false)} className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-lg">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}



                        {/* Profile Cropper Modal */}
                        {showProfileCropper && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg w-11/12 max-w-2xl">
                                    <h2 className="text-xl font-bold mb-4">Crop Profile Picture</h2>
                                    <ImageCropper
                                        src={tempProfileSrc}
                                        onCropComplete={(croppedImage) => handleCropComplete(croppedImage, 'profile')}
                                        onCrop={(croppedImage) => handleImageApply(croppedImage, 'profile')}
                                        aspectRatio={1}
                                    />
                                    <button onClick={() => setShowProfileCropper(false)} className="bg-rose-600 text-white px-4 py-2 rounded-lg">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>

            }

        </section>


    )
}

export default ProfileEditor;
