import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Menubar from "../components/Menubar";

const Home = () => {

  const navigation = useNavigate();

  return (
    <>
    <Menubar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-red-500 mb-4 text-center">
        Welcome to Authify
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Secure your journey with modern authentication. 
        Manage your account easily and safely with Authify.
      </p>

      {/* Get Started Button with Icon */}
      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
        onClick={() => {navigation("/login")}}
      >
        <span>Get Started</span>
        <FaArrowRight />
      </button>

      {/* Decorative Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Fast • Secure • Reliable
        </p>
      </div>
    </div>
    </>
  );
};

export default Home;
