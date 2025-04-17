import { GraduationCap } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"


export function GigsAlert() {

    return (

        <AlertDialog>


            <AlertDialogTrigger asChild>
                <div>
                    <button
                        className="bg-[#eb8125] text-white font-semibold text-xs px-5 py-2 flex items-center sm:hidden"
                    >
                         Hire Students <GraduationCap size={16} className="ms-2" />
                    </button>

                    <button className={`hidden sm:flex items-center gap-x-2 bg-[#eb8125] text-white font-semibold text-md md:px-2 lg:px-6  xl:px-14 py-2  hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out `}>
                        Hire Students <GraduationCap size={24} />
                    </button>
                </div>
            </AlertDialogTrigger>


            <AlertDialogContent className="bg-orange-100">

                <AlertDialogHeader>

                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-700">
                        Are you sure you want to proceed to the Students Gigs Employer page?
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <a href="https://gigs.studentsgigs.com/findtalent" target="_blank">
                        <AlertDialogAction className="bg-orange-600 hover:bg-[#eb8125] w-full">Continue</AlertDialogAction>
                    </a>
                </AlertDialogFooter>

            </AlertDialogContent>


        </AlertDialog>
    )
}
