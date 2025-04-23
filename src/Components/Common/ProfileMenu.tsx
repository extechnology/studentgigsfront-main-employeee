import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { User, Settings, Crown, Bookmark, KeyRound, LogOut, Gauge } from "lucide-react";
import LoginModal from "../LoginModal/Loginmodal";
import { useState } from "react";


interface ProfileMenuProps {
    LoginStatus: boolean;
    HandleLogOut: () => void;
    data: { profile?: { profile_pic?: string } }[];
    color?: boolean;
}


const ProfileMenu: React.FC<ProfileMenuProps> = ({ LoginStatus, HandleLogOut, data, color }) => {


    // Login modal
    const [isOpen, setIsOpen] = useState(false);

    const handleLoginClick = () => {
        setIsOpen(true);
    };


    return (

        <>

            <Popover className="relative">
                {({ }) => (
                    <>
                        <Popover.Button
                            className={`flex items-center gap-x-1 text-sm font-semibold text-gray-400 ${color ? "text-white" : ""}`}
                        >
                            <img
                                src={data[0]?.profile?.profile_pic ?? "/Header-profile.webp"}
                                loading="lazy"
                                alt="User profile"
                                className="w-[30px] h-[30px] rounded-full object-cover"
                            />
                        </Popover.Button>

                        <Popover.Panel
                            className="absolute -left-32 top-9 z-10 mt-3 w-52 dropdown rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                        >
                            <PopoverContent LoginStatus={LoginStatus} HandleLogOut={HandleLogOut} handleLoginClick={handleLoginClick} />

                        </Popover.Panel>
                    </>
                )}
            </Popover>

            {/* Login Modal */}
            <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />

        </>
    );

};


interface PopoverContentProps {
    LoginStatus: boolean;
    HandleLogOut: () => void;
    handleLoginClick: () => void;
}


const PopoverContent: React.FC<PopoverContentProps> = ({ LoginStatus, HandleLogOut, handleLoginClick }) => (

    <div className="p-4">
        <MenuItem link="/userprofile" icon={<User size={20} />} text="Profile" />
        <MenuItem link="/settings" icon={<Settings size={20} />} text="Settings" />
        <MenuItem link="/plans" icon={<Crown size={20} />} text="Premium" />
        <MenuItem link="/savedjobs" icon={<Bookmark size={20} />} text="Saved Jobs" />
        <MenuItem link="/planusage" icon={<Gauge size={20} />} text="Plan Usage" />

        {!LoginStatus ? (
            <button className="w-full hover:cursor-pointer text-left flex font-semibold items-center gap-2 text-sm text-gray-900 hover:bg-gray-50 p-4 rounded-lg" onClick={handleLoginClick}><KeyRound size={20} /> Login </button>
        ) : (
            <MenuItemLogout icon={<LogOut size={20} />} text="Logout" HandleLogOut={HandleLogOut} />
        )}

    </div>

);


interface MenuItemProps {
    link: string;
    icon: JSX.Element;
    text: string;
}



const MenuItem: React.FC<MenuItemProps> = ({ link, icon, text }) => (

    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50">
        <div className="flex-auto">
            <Popover.Button as={Link} to={link} className="font-semibold text-gray-900 flex items-center">
                {icon}
                <span className="ml-2">{text}</span>
            </Popover.Button>
        </div>
    </div>

);



interface MenuItemLogoutProps {
    icon: JSX.Element;
    text: string;
    HandleLogOut: () => void;
}



const MenuItemLogout: React.FC<MenuItemLogoutProps> = ({ icon, text, HandleLogOut }) => (

    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50">
        <div className="flex-auto">
            <Popover.Button
                as="p"
                className="font-semibold text-gray-900 flex items-center cursor-pointer"
                onClick={HandleLogOut}
            >
                {icon}
                <span className="ml-2">{text}</span>
            </Popover.Button>
        </div>
    </div>

);

export default ProfileMenu;