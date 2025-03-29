

export default function PersonalInfoLoader() {
    return (


        <>



            <div className="animate-pulse p-4 pt-10">

                {/* Banner Skeleton */}
                <div className="relative h-[20vh] md:h-[25vh] lg:h-[39vh] rounded-lg md:rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse" />


                {/* Profile Picture Skeleton */}
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


                <section className="grid grid-cols-1 md:grid-cols-2 gap-9 px-2 sm:px-10">

                    {/* About Me Section */}
                    <div className="pt-10">
                        <div>
                            {/* Title */}
                            <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-xl mb-5"></div>
                            {/* Paragraph */}
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="md:p-4">
                        <div className="max-w-full md:max-w-2xl mx-auto">
                            <div className="shadow-sm bg-gray-50 rounded-lg p-4 md:p-6">
                                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-full mb-4"></div>
                                <table className="w-full text-sm text-left text-gray-600">
                                    <tbody>
                                        {[...Array(6)].map((_, index) => (
                                            <tr key={index} className="border-b">
                                                <th className="px-4 py-2 font-medium whitespace-nowrap block md:table-cell">
                                                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </section>


                {/* Skills Skelton */}
                <section className="w-full py-4 px-2 sm:px-10">
                    <div className="h-7 w-48 bg-gray-200 animate-pulse rounded-full mb-5"></div>
                    <div className="flex flex-wrap justify-start">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="w-full md:w-1/2 xl:w-1/3 mb-5 px-2">
                                <div className="flex justify-between mb-1">
                                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-full"></div>

                                </div>
                                <div className="w-full bg-gray-200 rounded-full">
                                    <div className="bg-gray-200 h-3 rounded-full animate-pulse" style={{ width: '50%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Soft Skills Skelton */}
                <section className="w-full py-10 px-2 sm:px-10">
                    <div className="h-5 w-48 bg-gray-200 animate-pulse rounded-full mb-5"></div>
                    <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 animate-pulse w-24 h-6 rounded-full"
                            ></span>
                        ))}
                    </div>
                </section>


                {/* Experience Skelton */}
                <section className="w-full pb-8 sm:px-10 px-2 py-10">
                    <div className="h-5 w-48 bg-gray-200 animate-pulse rounded-full mb-5"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-10">
                        {[...Array(3)].map((_, index) => (
                            <div className="flex gap-5" key={index}>
                                <div className="w-14 h-14 bg-gray-200 animate-pulse rounded-md"></div>
                                <div>
                                    <div className="flex items-center">
                                        <div className="w-32 h-5 bg-gray-200 animate-pulse rounded-full"></div>
                                        <div className="w-20 h-5 bg-gray-200 animate-pulse rounded-full ml-2"></div>
                                    </div>
                                    <div className="w-40 h-5 bg-gray-200 animate-pulse rounded-full mt-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>



                <div className="space-y-4 sm:space-y-8 py-10">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse bg-gray-50/10"
                        >
                            <div className="px-3 py-4 sm:px-6 sm:py-8">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
                                    {/* Left Column - Year */}
                                    <div className="sm:w-24 pt-1">
                                        <div className="h-4 w-16 bg-gray-200 rounded-xl"></div>
                                    </div>

                                    {/* Middle Column - Main Content */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                                                <div className="h-5 w-52 sm:w-56 bg-gray-200 rounded-md"></div>
                                                <div className="h-5 w-16 bg-gray-200 rounded-xl"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 bg-gray-200 rounded-xl"></div>
                                                <div className="h-4 w-32 sm:w-48 bg-gray-200 rounded-xl"></div>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <div className="h-4 w-4 bg-gray-200 rounded-xl"></div>
                                                <div className="h-4 w-24 sm:w-40 bg-gray-200 rounded-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>


        </>


    )
}
