import axios from "axios";
import { useContext, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreatedAccount, setIsCreatedAccount] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendURL, getUserData, setIsLoggedIn } = useContext(AppContext)!;
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      if (!isCreatedAccount) {
        // register API
        const response = await axios.post(`${backendURL}/register`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          navigate("/");
          toast.success("Account created successfully");
        } else {
          toast.error(
            "Email already exists or cannot create account this time",
          );
        }
      } else {
        // login API
        const response = await axios.post(`${backendURL}/login`, {
          email,
          password
        });

        if(response.status === 200){
          setIsLoggedIn(true);
          navigate("/");
          getUserData();
          toast.success("Logged into account");
        }else{
          toast.error("Email or password incorrect");
        }

      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          {isCreatedAccount ? "Login to Authify" : "Create Account"}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {!isCreatedAccount ? (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ) : null}

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              id="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {!isCreatedAccount ? (
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
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
          >
            <FaSignInAlt />
            <span>
              {loading
                ? "Processing..."
                : isCreatedAccount
                  ? "Login"
                  : "Create Account"}
            </span>
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
                  setName("");
                  setEmail("");
                  setPassword("");
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
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
              >
                Login
              </Link>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
