import { FaEnvelope, FaKey, FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Reset Password
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center mb-6">
          Enter your email to receive an OTP and reset your password.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Send OTP Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 mb-6"
        >
          <FaKey />
          Send OTP
        </button>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-center tracking-widest"
          />
        </div>

        {/* New Password Input */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Reset Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          <FaCheckCircle />
          Reset Password
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;
