import axios from "axios";
import { useContext, useState } from "react";
import { FaEnvelope, FaKey, FaCheckCircle } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const {backendURL} = useContext(AppContext)!;
  const navigate = useNavigate();

  const sendResetOTP = async () =>{
    setIsSendingOTP(true);
    try{
      const response = await axios.post(`${backendURL}/send-reset-otp?email=${email}`);
      if(response.status === 200){
        toast.success("OTP has been sent successfully");
      }else{
        toast.error("Unable to send OTP");
      }
    }catch(error){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Request failed");
      }else{
        toast.error("Unexpected error occurred");
      }
    }finally{
      setIsSendingOTP(false);
    }
  }

  const resetPassword = async () => {
    setIsResetting(true);
    try{
      const response = await axios.post(`${backendURL}/reset-password`, {
        email:email,
        otp:OTP,
        newPassword:newPassword
      });
      if(response.status === 200){
        toast.success("Password reset successfully");
        navigate("/");
      }else{
        toast.success("Unable to reset password");
      }
    }catch(error){
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || "Request failed");
      }else{
        toast.error("Unexpected error occurred");
      }
    }finally{
      setIsResetting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">

        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Reset Password
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Enter your email to receive an OTP and reset your password.
        </p>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={isSendingOTP}
          onClick={() =>{sendResetOTP();}}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 mb-6"
        >
          <FaKey />
          {isSendingOTP ? "Sending..." : "Send OTP"}
        </button>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-center tracking-widest"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="button"
          disabled={isResetting}
          onClick={() =>{resetPassword();}}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          <FaCheckCircle />
          {isResetting ? "Resetting..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;
