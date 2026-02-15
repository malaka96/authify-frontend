import { useEffect, useState, type ReactNode } from "react";
import { AppContext, type User } from "./AppContext";
import { AppConstants } from "../utils/Constants";
import axios from "axios";
import { toast } from "react-toastify";

type AppContextProviderProps = {
  children: ReactNode;
};

axios.defaults.withCredentials = true;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const backendURL = AppConstants.API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/profile`);
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error("Unable to retrive profile data");
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
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${backendURL}/profile`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserData(response.data);
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
        setUserData(null);
      } finally{
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const contextValue = {
    backendURL,
    isLoggedIn,
    authLoading,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    setAuthLoading
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
