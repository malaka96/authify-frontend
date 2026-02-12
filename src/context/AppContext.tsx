import { createContext } from "react";

type AppContextType = {
    backendURL: string;
    isLoggedIn: boolean;
    setIsLoggedIn: (newState: boolean) => void;
    userData: boolean;
    setUserData: (newState: boolean) => void;
}



export const AppContext = createContext<AppContextType | undefined>(undefined);

