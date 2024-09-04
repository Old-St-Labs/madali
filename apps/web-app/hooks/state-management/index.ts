import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    createEmployeeListSlice,
    IEmployeeListData,
} from './createEmployeeListSlice';
import {
    createReportQuestionsSlice,
    IReportQuestions,
} from './createReportQuestionsSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IStore extends IEmployeeListData, IReportQuestions {}

export const useSessionStore = create<IStore>()(
    persist(
        (set, get, api) => ({
            ...createEmployeeListSlice(set, get, api),
            ...createReportQuestionsSlice(set, get, api),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
