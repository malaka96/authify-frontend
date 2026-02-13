import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import ProfileWindow from "./ProfileWindow";
import { AppContext } from "../context/AppContext";

const Menubar = () => {
  const navigation = useNavigate();
  const { userData } = useContext(AppContext)!;
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-[#161414e1] text-white z-50 shadow-md">
      
      {/* Brand */}
      <div className="text-2xl font-bold text-red-500">
        Authify
      </div>

      {/* Right side */}
      <div className="relative">
        {userData ? (
          <>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 text-white hover:text-red-400 transition"
            >
              <FaUserCircle size={22} />
              <span>{userData.name}</span>
            </button>

            {showProfile && (
              <ProfileWindow onClose={() => setShowProfile(false)} />
            )}
          </>
        ) : (
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
            onClick={() => navigation("/login")}
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Menubar;
