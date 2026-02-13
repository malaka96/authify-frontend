import { useContext, useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

  const [isSendginOTP, setIsSendingOTP] = useState(false);
  const [isVerifing, setIsVerifing] = useState(false);
  const [OTP, setOTP] = useState("");

  const {backendURL, getUserData} = useContext(AppContext)!;
  const naviget = useNavigate();

  const sendVerifyOTP = async () => {
    setIsSendingOTP(true);
    try{
      const response = await axios.post(`${backendURL}/send-otp`);
      if(response.status === 200){
        toast.success("OTP has been sent successfully");
      }else{
        toast.error("Unable to send OTP");
      }
    }catch(error){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    }finally{
      setIsSendingOTP(false);
    }
  }


  const verifyOTP = async () => {
    setIsVerifing(true);
    try{
      const response = await axios.post(`${backendURL}/verify-otp`, {"otp": OTP});
      if(response.status === 200){
        toast.success("OTP verified successfully");
        getUserData();
        naviget("/");
      }else{
        toast.error("Invalid OTP");
      }
    }catch(error){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    }finally{
      setIsVerifing(false);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Verify Your Email
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center mb-6">
          Click below to receive a verification OTP and enter it to verify your account.
        </p>

        {/* Send OTP Button */}
        <button
          type="button"
          disabled={isSendginOTP}
          onClick={() => {sendVerifyOTP();}}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 mb-6"
        >
          <FaEnvelope />
          {isSendginOTP ? "Sending..." : "Send OTP"}
        </button>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-center tracking-widest"
          />
        </div>

        {/* Verify Button */}
        <button
          type="button"
          disabled={isVerifing}
          onClick={() => {verifyOTP();}}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          <FaCheckCircle />
          {isVerifing ? "Verifing..." : "Verify OTP"}
        </button>

      </div>
    </div>
  );
};

export default EmailVerify;
