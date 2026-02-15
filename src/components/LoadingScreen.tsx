import { FaShieldAlt } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      <div className="relative mb-6">
        <FaShieldAlt className="text-red-500 text-6xl animate-pulse" />
      </div>

      <h1 className="text-3xl font-bold text-red-500 mb-3">
        Authify
      </h1>

      <p className="text-gray-400 mb-6">
        Securing your session...
      </p>

      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

    </div>
  );
};

export default LoadingScreen;
