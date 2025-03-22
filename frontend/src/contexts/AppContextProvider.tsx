import React, { useState } from "react";
import Toast from "../components/Toast";
import { AppContext, ToastMessage } from "./AppContextUtils"; // Import types and context

export const AppContextProvider = ({ 
    children 
}: { 
    children: React.ReactNode 
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    return (
        <AppContext.Provider 
            value={{
                showToast: (toastMessage) => setToast(toastMessage),
            }}
        >
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};