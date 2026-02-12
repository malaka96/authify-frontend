import type { ReactNode } from "react";
import { AppContext } from "./AppContext";

type AppContextProviderProps = {
    children : ReactNode;
}

export const AppContextProvider = ({children} : AppContextProviderProps) => {

    const contextValue = {

    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );

}