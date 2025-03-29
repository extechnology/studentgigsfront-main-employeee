

export default function NotificationLoader() {
    return (


        <>

            <div className="flex-1 min-w-0 animate-pulse">
                {/* Title and Date */}
                <div className="flex justify-between items-start">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded ml-2"></div>
                </div>

                {/* Job or Description */}
                <div className="mt-2">
                    <div className="h-3 w-40 bg-gray-300 rounded"></div>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="h-3 w-3 bg-gray-300 rounded"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    </div>
                </div>

                {/* Description Placeholder */}
                <div className="h-3 w-full bg-gray-300 rounded mt-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 rounded mt-1"></div>

                {/* View Details */}
                <div className="mt-2 flex items-center">
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-3 bg-gray-300 rounded ml-2"></div>
                </div>
            </div>

        </>


    )
}
