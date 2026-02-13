import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

type ProfileWindowProps = {
  onClose: () => void;
};

const ProfileWindow = ({ onClose }: ProfileWindowProps) => {
  const { userData, setUserData, setIsLoggedIn } = useContext(AppContext)!;
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // Clear auth state
    setUserData(null);
    setIsLoggedIn(false);

    // optional: remove token if stored
    // localStorage.removeItem("token");

    onClose();
    navigate("/login");
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
     className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-700 p-4 z-50">
      <div className="mb-3">
        <p className="font-semibold text-white">{userData.name}</p>
        <p className="text-sm text-gray-400">{userData.email}</p>
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
