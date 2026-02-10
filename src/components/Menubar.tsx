import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Menubar = () => {

  const navigation = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-[#161414e1] text-white z-50 shadow-md">
      {/* Left side - Brand */}
      <div className="text-2xl font-bold text-red-500">
        Authify
      </div>

      {/* Right side - Login button */}
      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
        onClick={() =>{navigation("/login")}}
      >
        <FaSignInAlt />
        <span>Login</span>
      </button>
    </nav>
  );
};

export default Menubar;
