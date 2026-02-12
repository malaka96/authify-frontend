import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import { AppConstants } from "../utils/Constants";

type AppContextProviderProps = {
    children : ReactNode;
}

export const AppContextProvider = ({children} : AppContextProviderProps) => {

    const backendURL = AppConstants.API_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData
    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );

}