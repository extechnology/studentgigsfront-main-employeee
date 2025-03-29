import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { Bell, AlertCircle, ChevronRight, Briefcase, MapPin, Calendar } from "lucide-react";
import { PlanData } from "@/Context/AuthContext";
import { motion } from "framer-motion";
import { MarkAsRead, ClearAllNotifications, NotificationAlert } from "@/Hooks/Utils";
import toast from "react-hot-toast";
import NotificationLoader from "../Loaders/NotificationLoader";



// Interface for notification items
interface BaseNotification {
    id: number;
    posted_at: string;
    is_read: boolean;
    employee: number
}


// Job notification Types
interface JobNotification extends BaseNotification {
    notification_type: 'job';
    title: string;
    company: string;
    location: string;
    job_id: number;
    job_type: string
    description: string

}


// Plan notification Types
interface PlanNotification extends BaseNotification {
    notification_type: 'plan';
    title: string;
    description: string;
}


type NotificationItem = JobNotification | PlanNotification;



// Interface for Crown component
interface CrownProps {
    className?: string;
}


// Interface for NotificationPopover component
interface NotificationPopoverProps {
    isAuthenticated: boolean;
    isPlanExpired: boolean;
    plan: PlanData | null;
    color: boolean;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
    isAuthenticated,
    plan,
    isPlanExpired,
    color
}) => {



    // Get notifications Data
    const { data, isLoading, isError, isFetching } = NotificationAlert();


    // Clear notifications
    const { mutate: clearNotifications } = ClearAllNotifications();


    // Mark notification as read
    const { mutate: markAsRead } = MarkAsRead();


    // Count unread notifications
    const unreadCount = data?.filter((n: NotificationItem) => !n.is_read).length;



    // Clear notifications
    const handleClearNotifications = () => {

        // API call to clear notifications
        clearNotifications("delete", {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("All notifications cleared");

                } else {

                    toast.error("Something went wrong. Please try again Later.");

                }

            }

        })

    };



    // Mark Notification as readed
    const handleMarkAllAsRead = () => {

        // API call to mark all notifications as read
        markAsRead("mark", {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("All notifications marked as read");

                } else {

                    toast.error("Something went wrong. Please try again Later.");

                }

            }

        });

    };



    const renderNotificationContent = () => {



        // Not authenticated
        if (!isAuthenticated) {
            return (
                <div className="p-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AlertCircle className="h-16 w-16 text-gray-400 mb-3" />
                    </motion.div>
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view notifications</h3>
                        <p className="text-sm text-gray-500 mb-4">Sign in to your account to access your notifications</p>
                        <Link
                            to="/auth"
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg inline-block"
                        >
                            Sign In
                        </Link>
                    </motion.div>
                </div>
            );
        }




        // Plan expired or notifications not included in plan
        if (isPlanExpired || plan?.job_alerts_and_notifications?.toLowerCase() !== "yes") {
            return (
                <div className="p-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Crown className="h-16 w-16 text-amber-400 mb-3" />
                    </motion.div>
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upgrade your plan</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {isPlanExpired
                                ? "Your plan has expired. Upgrade to access notifications."
                                : "Notifications aren't included in your current plan."}
                        </p>
                        <Link
                            to="/plans"
                            className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-amber-500 hover:to-amber-700 transition-all hover:shadow-lg inline-block"
                        >
                            Upgrade Now
                        </Link>
                    </motion.div>
                </div>
            );
        }



        // Show notifications
        return (
            <>

                <div className="flex items-center rounded-lg justify-between p-4 border-b border-gray-100 sticky top-0 bg-[#eb8125] z-10 backdrop-blur-sm ">


                    <h3 className="font-semibold text-white">Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>


                    <div className="flex space-x-2">
                        {data?.length > 0 && unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs text-gray-100 hover:text-gray-600 font-bold"
                            >
                                Mark all as read
                            </button>
                        )}
                        {data?.length > 0 && (
                            <button
                                onClick={handleClearNotifications}
                                className="text-xs text-white hover:text-gray-600 font-bold"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                </div>


                <div className="max-h-96 overflow-y-auto custom-scrollbar">


                    {isLoading || isFetching || isError ? (

                        <NotificationLoader />

                    ) : data?.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -5, 0],
                                        rotate: [0, -5, 0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                >
                                    <Bell className="h-16 w-16 text-amber-500" />
                                </motion.div>

                                <motion.div
                                    className="absolute top-0 left-1/2 -ml-8 w-16 h-16"
                                    initial={{ opacity: 0.3 }}
                                    animate={{
                                        opacity: [0.3, 0.5, 0.3],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                >
                                    <div className="w-full h-full rounded-full bg-gray-200 opacity-30"></div>
                                </motion.div>

                            </motion.div>


                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-gray-500 text-sm mt-4"
                            >
                                No notifications yet
                            </motion.p>


                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="text-gray-400 text-xs mt-2"
                            >
                                We'll notify you when something important happens
                            </motion.p>

                        </div>

                    ) : (

                        <div className="divide-y divide-gray-100">
                            {data?.map((notification: NotificationItem, index: number) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <Notification notification={notification} />
                                </motion.div>
                            ))}
                        </div>

                    )}

                </div>
            </>
        );
    };


    // Render popover
    return (

        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className={`relative p-2 rounded-full ${color ? "text-white" : "text-gray-400"} hover:${color ? "bg-white/10" : "bg-gray-100"} focus:outline-none transition-all duration-200`}>
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3"
                            >
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </motion.span>
                        )}
                    </Popover.Button>

                    <Transition
                        show={open}
                        enter="transition duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition duration-150 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel className="absolute -right-7 z-10 mt-3 w-[85vh] notification-dropdown max-w-[calc(100vw-20px)] origin-top-right rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                            {renderNotificationContent()}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};



interface NotificationProps {
    notification: NotificationItem;
}


// Notification 
const Notification: React.FC<NotificationProps> = ({ notification }) => {


    // Notification Link
    const getNotificationLink = (notification: NotificationItem) => {
        if (notification.notification_type === 'job') {
            return `/jobdeatils/${notification.job_id}/${notification.job_type}`;
        } else {
            return '/plans';
        }
    };



    // Notification Icon
    const getNotificationIcon = (notification: NotificationItem) => {
        if (notification.notification_type === 'job') {
            return <Briefcase className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-full" />;
        } else {
            return <Calendar className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-full" />;
        }
    };



    return (
        <Link
            to={getNotificationLink(notification)}
            className={`flex items-start p-4 hover:bg-gray-50 transition-all ${!notification.is_read ? 'bg-blue-50/70 hover:bg-blue-50' : ''
                }`}
        >
            <div className="flex-shrink-0 mr-3">
                {getNotificationIcon(notification)}
            </div>

            <div className="flex-1 min-w-0">


                <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${!notification.is_read ? 'text-amber-600' : 'text-gray-900'}`}>
                        {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {new Date(notification.posted_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).replace(",", "-")}
                    </span>

                </div>


                {notification.notification_type === 'job' ? (

                    <div className="mt-1">
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                            <span className="font-medium">{notification.company}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{notification.location}</span>
                        </div>
                    </div>
                    
                ) : (
                    <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                )}


                <div className={`mt-2 text-xs ${!notification.is_read ? 'text-amber-600' : 'text-gray-500'} font-medium flex items-center`}>
                    View details
                    <ChevronRight className="h-3 w-3 ml-1" />
                </div>

            </div>
        </Link>
    );
};



// Crown component for the plan upgrade section
const Crown: React.FC<CrownProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </svg>
);



export default NotificationPopover;