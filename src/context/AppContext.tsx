import { createContext } from "react";

export type User = {
  userId: string;
  name: string;
  email: string;
  isAccountVarified: boolean;
};


type AppContextType = {
    backendURL: string;
    isLoggedIn: boolean;
    setIsLoggedIn: (newState: boolean) => void;
    userData: User | null;
    setUserData: (value: User) => void;
    getUserData: () => void;
}



export const AppContext = createContext<AppContextType | undefined>(undefined);

