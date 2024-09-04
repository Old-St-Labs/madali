import { ViewReportDisplay } from '@web-app/types/report';
import { createContext, useContext, useState } from 'react';

const ReportContext = createContext(null);

export type ReportContextType = {
    currentView: ViewReportDisplay;
    updateCurrentView: (view: ViewReportDisplay) => void;
};

export const ReportContextProvider = ({ children }) => {
    const [currentView, setCurrentView] =
        useState<ViewReportDisplay>('REFERRAL_FORM');

    const updateCurrentView = (view: ViewReportDisplay) => {
        setCurrentView(view);
    };

    return (
        <ReportContext.Provider
            value={{
                currentView,
                updateCurrentView,
            }}
        >
            {children}
        </ReportContext.Provider>
    );
};

export const useReportContext = () => {
    const context = useContext<ReportContextType>(ReportContext);

    return context;
};
