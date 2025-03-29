import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";



interface CompanyCardProps {
    logo: string;
    title: string;
    location: string;
    jobcount: number;
    id: number
    info: string
}

export default function CompanyCard({ logo, title, location, jobcount, id, info }: CompanyCardProps) {



    // Function to truncate text
    const truncateText = (text: string, wordLimit: number = 10) => {
        const words = text.split(' ');

        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }

        return text;
    };




    return (

        <>

            <section>

                {/* Card */}
                <div className="bg-white rounded-sm p-5 relative border border-gray-100 sm:w-72 w-full shadow-md flex flex-col h-[250px]">

                    <Link to={`/employerdeatils/${id}`}>

                        {/* Company Logo Container */}
                        <div className="absolute -top-5 left-5">
                            <div className="w-14 h-14 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center">
                                <img
                                    src={logo}
                                    loading="lazy"
                                    alt={`Company logo`}
                                    className="w-full rounded-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-8 flex flex-col flex-1">

                            {/* Company Name */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-1.5 hover:text-green-500">
                                {title}
                            </h3>

                            {/* Job Title */}
                            <p className="text-gray-400 text-sm pb-5 border-b border-gray-100 text-justify leading-4 flex-1 overflow-hidden">
                                {truncateText(info, 15)}
                            </p>

                            {/* Location and Job Count */}
                            <div className="flex items-center justify-between pt-5">
                                <div className="flex items-center text-gray-400 text-sm">
                                    <MapPin className="w-4 h-4 mr-1.5" />
                                    <span>{location}</span>
                                </div>
                                <span className="text-emerald-600 font-medium text-sm">
                                    {jobcount} Jobs
                                </span>
                            </div>

                        </div>

                    </Link>

                </div>

            </section>

        </>



    )



}
