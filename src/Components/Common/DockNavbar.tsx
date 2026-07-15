import { Link, useLocation } from "react-router-dom";
import { House, Search, Bookmark, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { GetPersonalInfo } from "@/Hooks/UserProfile";
import ProfileAvatar from "@/Components/Common/ProfileAvatar";

export default function DockNavbar() {
  const location = useLocation();

  const { data } = GetPersonalInfo();
  const selectedUser = data?.[0];
  const profilePic =
    selectedUser?.profile?.profile_pic || selectedUser?.profile_photo;
  const profileName =
    selectedUser?.name ||
    selectedUser?.employee_name ||
    selectedUser?.username;

  const currentPath = location.pathname;

  const isHomeActive = currentPath === "/";
  const isSearchActive =
    currentPath === "/jobfilter" ||
    currentPath.startsWith("/jobdeatils") ||
    currentPath.startsWith("/applyjob");
  const isSavedActive = currentPath === "/savedjobs";
  const isProfileActive =
    currentPath === "/userprofile" ||
    currentPath === "/settings" ||
    currentPath === "/planusage" ||
    currentPath === "/plans";

  const handleMenuClick = () => {
    document.dispatchEvent(new CustomEvent("open-mobile-menu"));
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: House,
      isActive: isHomeActive,
      isProfile: false,
    },
    {
      label: "Search",
      path: "/jobfilter",
      icon: Search,
      isActive: isSearchActive,
      isProfile: false,
    },
    {
      label: "Saved",
      path: "/savedjobs",
      icon: Bookmark,
      isActive: isSavedActive,
      isProfile: false,
    },
    {
      label: "Profile",
      path: "/userprofile",
      icon: User,
      isActive: isProfileActive,
      isProfile: true,
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-4 left-1/2 z-50 lg:hidden"
      style={{ width: "min(92vw, 420px)" }}
    >
      {/* Main Dock Pill */}
      <div className="flex items-center justify-around w-full h-[4.25rem] px-2 bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-transform active:scale-95"
            >
              {/* Animated active background bubble */}
              {item.isActive && (
                <motion.div
                  layoutId="student-active-dock-pill"
                  className="absolute inset-0 bg-[#004673]/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <motion.div
                animate={{
                  scale: item.isActive ? 1.08 : 1,
                  y: item.isActive ? -1 : 0,
                }}
                className={`relative z-10 flex flex-col items-center justify-center gap-0.5 ${
                  item.isActive
                    ? "text-[#004673]"
                    : "text-gray-400 hover:text-[#004673]"
                }`}
              >
                {item.isProfile ? (
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      item.isActive
                        ? "ring-2 ring-[#004673]"
                        : "ring-1 ring-gray-300"
                    }`}
                  >
                    <ProfileAvatar
                      src={profilePic}
                      name={profileName}
                      className="h-6 w-6 rounded-full object-cover"
                      textClassName="text-[9px]"
                    />
                  </div>
                ) : (
                  <IconComponent
                    size={21}
                    strokeWidth={item.isActive ? 2.5 : 2}
                  />
                )}

                <span
                  className={`text-[9px] font-semibold tracking-wide leading-none ${
                    item.isActive ? "text-[#004673]" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* More button → triggers slide-in drawer */}
        <button
          onClick={handleMenuClick}
          className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full text-gray-400 hover:text-[#004673] active:scale-95 transition-transform"
        >
          <Menu size={21} strokeWidth={2} />
          <span className="text-[9px] font-semibold tracking-wide leading-none mt-0.5">
            More
          </span>
        </button>
      </div>
    </motion.div>
  );
}
