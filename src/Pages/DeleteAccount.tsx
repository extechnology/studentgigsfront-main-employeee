import { Trash2 } from "lucide-react";
import DeleteOtpModal from "@/Components/otp/DeleteAccountOtp";
import { useState } from "react";



export default function DeleteAccount() {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <section className="w-full h-full">

            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 border">
                <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Delete Your Account
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Once you delete your account, all of your data will be permanently
                        removed and cannot be recovered. Are you sure you want to continue?
                    </p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-full hover:cursor-pointer font-medium bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex justify-center items-center"
                    >
                        Delete Account <Trash2 className="h-4 w-4 ml-2" />
                    </button>
                </div>
            </div>


            {/* <DeleteOtpModal /> */}
            <DeleteOtpModal isOpen={isOpen} setIsOpen={setIsOpen} />

        </section>

    )


}
