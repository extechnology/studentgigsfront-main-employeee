

export default function PlanUsageLoader() {

    return (

        <>

            <div className="max-w-5xl mx-auto animate-pulse">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="h-8 w-40 bg-gray-200 mx-auto rounded"></div>
                    <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full my-3"></div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 overflow-hidden mb-6">
                    {/* Plan Name */}
                    <div className="h-10 w-40 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>

                    {/* Plan Expiry */}
                    <div className="h-10 w-48 bg-gray-200 rounded-full mb-6"></div>

                    {/* Progress Bar */}
                    <div className="h-8 bg-gray-200 rounded-full w-full mb-6"></div>

                    {/* Data Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-24 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>

                    {/* Calendar Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="h-20 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>

        </>

    )

}
