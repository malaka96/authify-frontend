import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

type ProfileWindowProps = {
  onClose: () => void;
};

const ProfileWindow = ({ onClose }: ProfileWindowProps) => {
  const { userData, setUserData, setIsLoggedIn, backendURL } =
    useContext(AppContext)!;
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendURL}/logout`);
      if (response.status === 200) {
        // Clear auth state
        setUserData(null);
        setIsLoggedIn(false);

        // optional: remove token if stored
        // localStorage.removeItem("token");

        onClose();
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!userData) return null;

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-700 p-4 z-50"
    >
      <div className="mb-3">
        {/* Name + Verified Chip */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white">{userData.name}</p>

          <button
            onClick={() =>{
                if(!userData.isAccountVarified){
                    navigate("/email-verify");
                }
            }}
            className={`text-[8px] px-2 py-1 rounded-full cursor-pointer font-medium ${
              userData.isAccountVarified
                ? "bg-green-600/20 text-green-400 border border-green-500"
                : "bg-red-600/20 text-red-400 border border-red-500"
            }`}
          >
            {userData.isAccountVarified ? "Verified" : "Not Verified"}
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-1">{userData.email}</p>
      </div>

      <hr className="border-gray-700 mb-3" />

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileWindow;
