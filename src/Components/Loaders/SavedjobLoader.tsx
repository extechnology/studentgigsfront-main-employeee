

export default function SavedjobLoader() {
    
    return (
        <>

            <div className="grid gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm animate-pulse"
                    >
                        <div className="flex items-start">
                            {/* Company Logo Skeleton */}
                            <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>

                            {/* Job Details Skeleton */}
                            <div className="flex-grow">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="flex flex-wrap gap-y-3 mt-2">
                                    <div className="h-3 bg-gray-200 rounded w-1/4 mr-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4 mr-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4 mr-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>

                                {/* Action Buttons Skeleton - Desktop */}
                                <div className="hidden md:flex mt-4 space-x-2">
                                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>

                            {/* Delete Button Skeleton */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Action Buttons Skeleton - Mobile */}
                        <div className="flex md:hidden mt-4 space-x-2 w-full">
                            <div className="h-8 bg-gray-200 rounded flex-1"></div>
                            <div className="h-8 bg-gray-200 rounded flex-1"></div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}
