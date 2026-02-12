import { createContext } from "react";

type AppContextType = {
    user? : string;
    setUser? : (user: string) => void;
}



export const AppContext = createContext<AppContextType | undefined>(undefined);

