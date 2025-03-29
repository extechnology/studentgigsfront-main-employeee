import { MapPin, MousePointerClick } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



interface Props {

    postion: string,
    posteddate: string,
    salary: string
    salary_Type: string
    companyname: string
    logo: string
    jobtype: string
    loaction: string
    job_id : number

}


export default function CompanyOpening({ job_id, postion, posteddate, salary, salary_Type, companyname, logo, jobtype, loaction }: Props) {




    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(posteddate), { addSuffix: true }));

    useEffect(() => {

        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(new Date(posteddate), { addSuffix: true }));
        }, 60000);

        return () => clearInterval(interval);

    }, [posteddate]);


    return (


        <>

            <section>


                <div className="w-full sm:px-0 m-auto">

                    <div >

                        <div className="border p-6 rounded-lg  hover:scale-105 duration-300 shadow-sm">

                            <div className="flex gap-10 items-center justify-between">

                                <h2 className="font-semibold text-xl pb-3">{postion}</h2>

                                <Link to={`/jobdeatils/${job_id}/${jobtype}`}>

                                    <button className="flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-transform transform hover:scale-105 duration-300 ease-in-out">
                                        Apply <MousePointerClick size={20} className='ms-2' />
                                    </button>

                                </Link>

                            </div>


                            <div className="flex gap-2 items-center">
                                <span className="text-[#059669]">
                                    <i className="fas fa-clock"></i>
                                </span>
                                <p className="">{timeAgo}</p>
                            </div>


                            <div className="flex justify-between py-5">
                                <h2 className="bg-green-100 text-[#059669] font-semibold text-sm px-2 rounded-lg">
                                    {jobtype}
                                </h2>

                                <p className="font-semibold text-gray-400">
                                    <span className="text-[#059669]">&#8377;</span> {salary} - {salary_Type}
                                </p>
                            </div>

                            <hr />

                            <div className="flex pt-5">
                                <img
                                    src={logo ? logo : '/Employer-Default.png'}
                                    className=" w-[60px] h-[60px] sm:w-[50px] sm:h-[50px]  shadow-md rounded-full"
                                    alt="logo"
                                />
                                <div className="pl-3 items-center">
                                    <h2 className="font-semibold">{companyname}</h2>
                                    <p className="flex items-center"><MapPin size={16} className="me-1" /> {loaction}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


        </>



    )
}
