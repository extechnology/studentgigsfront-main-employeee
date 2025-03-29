
export default function PlanLoader() {


    return (

        <>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div className="max-w-7xl mx-auto relative z-10">

                    <div className="text-center mb-16">
                        <div className="inline-block mb-2 px-4 py-1 bg-gray-200 rounded-full h-6 w-40 animate-pulse"></div>
                        <div className="h-10 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse mt-3"></div>
                        <div className="h-6 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse mt-4"></div>
                    </div>

                    <div className="mx-auto max-w-lg mb-10 text-center">
                        <div className="bg-white rounded-xl shadow-lg px-6 py-4 inline-flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-2xl p-8 animate-pulse">
                                <div className="h-4 w-52 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-44 bg-gray-200 rounded mb-4"></div>
                                <div className="h-16 w-16 bg-gray-200 rounded-full mb-6"></div>
                                <ul className="space-y-4 mb-8">
                                    {[1, 2, 3, 4].map((_, idx) => (
                                        <li key={idx} className="flex justify-between">
                                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="w-full py-3 px-6 rounded-xl bg-gray-200 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>


    )
}
