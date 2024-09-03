import { IReportQuestion } from '@web-app/types/report';
import { StateCreator } from 'zustand';

export interface IReportQuestions {
    reportQuestions: Partial<IReportQuestion>[];
    updateReportQuestions: (values: Partial<IReportQuestion>[]) => void;
    clearReportQuestions: () => void;
}

const initialState = [
    {
        id: '',
        questionType: '',
        question: '',
        updatedQuestion: '',
    },
];

export const createReportQuestionsSlice: StateCreator<IReportQuestions> = (
    set
) => ({
    reportQuestions: initialState,
    updateReportQuestions: (value: Partial<IReportQuestion>[]) => {
        set((state: IReportQuestions) => ({
            ...state,
            reportQuestions: value,
        }));
    },
    clearReportQuestions: () => set({ reportQuestions: initialState }),
});
