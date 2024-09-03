import { IReportAnswer, ViewReportDisplay } from '@web-app/types/report';
import { createContext, useContext, useState } from 'react';

const ReportContext = createContext(null);

export type ReportContextType = {
    currentView: ViewReportDisplay;
    updateCurrentView: (view: ViewReportDisplay) => void;
    reportAnswers: IReportAnswer[];
    updateReportAnswers: (answers: IReportAnswer[]) => void;
};

const answersTemp = [
    {
        questionId: 1,
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui odio, sagittis pharetra rutrum ac, convallis id tellus. Nulla facilisi. Aenean pellentesque, elit et dignissim lobortis, mi mi consequat lorem, sed auctor elit lorem vitae augue. Donec et sapien mollis, dignissim turpis ac, hendrerit odio. Integer fringilla molestie neque, nec vulputate eros aliquet vel.',
    },
    {
        questionId: 2,
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui odio, sagittis pharetra rutrum ac, convallis id tellus. Nulla facilisi. Aenean pellentesque, elit et dignissim lobortis, mi mi consequat lorem, sed auctor elit lorem vitae augue. Donec et sapien mollis, dignissim turpis ac, hendrerit odio. Integer fringilla molestie neque, nec vulputate eros aliquet vel.',
    },
    {
        questionId: 3,
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui odio, sagittis pharetra rutrum ac, convallis id tellus. Nulla facilisi. Aenean pellentesque, elit et dignissim lobortis, mi mi consequat lorem, sed auctor elit lorem vitae augue. Donec et sapien mollis, dignissim turpis ac, hendrerit odio. Integer fringilla molestie neque, nec vulputate eros aliquet vel.',
    },
];

// TODO: Move to a global state management
export const ReportContextProvider = ({ children }) => {
    const [currentView, setCurrentView] =
        useState<ViewReportDisplay>('REFERRAL_FORM');
    const [reportAnswers, setReportAnswers] =
        useState<IReportAnswer[]>(answersTemp);

    const updateCurrentView = (view: ViewReportDisplay) => {
        setCurrentView(view);
    };

    const updateReportAnswers = (answers: IReportAnswer[]) => {
        setReportAnswers(answers);
    };

    return (
        <ReportContext.Provider
            value={{
                currentView,
                updateCurrentView,
                reportAnswers,
                updateReportAnswers,
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
