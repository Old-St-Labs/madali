import { IPrefinedQuestion } from '@web-app/types/report';
import { StateCreator } from 'zustand';

export interface IReportQuestions {
    reportQuestions: Partial<IPrefinedQuestion>[];
    updateReportQuestions: (values: Partial<IPrefinedQuestion>[]) => void;
    clearReportQuestions: () => void;
}

const initialState = [
    {
        predefinedQuestionId: '',
        questionType: '',
        question: '',
    },
];

export const createReportQuestionsSlice: StateCreator<IReportQuestions> = (
    set
) => ({
    reportQuestions: initialState,
    updateReportQuestions: (value: Partial<IPrefinedQuestion>[]) => {
        set((state: IReportQuestions) => ({
            ...state,
            reportQuestions: value,
        }));
    },
    clearReportQuestions: () => set({ reportQuestions: initialState }),
});
