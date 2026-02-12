import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [isCreatedAccount, setIsCreatedAccount] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          {isCreatedAccount ? "Login to Authify" : "Create Account"}
        </h2>

        {!isCreatedAccount ? (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        ) : null}

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-300">Password</label>
            {isCreatedAccount ? (
              <Link
                to="/reset-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            ) : null}
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {!isCreatedAccount ? 
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-300">Confirm Password</label>
            {isCreatedAccount ? (
              <Link
                to="/reset-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            ) : null}
          </div>
          <input
            type="password"
            placeholder="Re-Enter your password"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div> : null}

        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200">
          <FaSignInAlt />
          <span>{isCreatedAccount ? "Login" : "Create Account"}</span>
        </button>

        <p className="mt-6 text-center text-gray-400">
          {isCreatedAccount
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          {isCreatedAccount ? (
            <Link
              to="/login"
              className="text-red-500 hover:underline"
              onClick={() => {
                setIsCreatedAccount(false);
              }}
            >
              Create Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-red-500 hover:underline"
              onClick={() => {
                setIsCreatedAccount(true);
              }}
            >
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
