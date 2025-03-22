import { createContext, useContext } from "react";

export type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

export type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
};

export const AppContext = createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};