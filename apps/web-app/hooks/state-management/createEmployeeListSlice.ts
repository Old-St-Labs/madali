import { IEmployeeList } from '@web-app/types/employee';
import { StateCreator } from 'zustand';

export interface IEmployeeListData {
    employeeData: IEmployeeList;
    updateEmployeeData: (values: IEmployeeList) => void;
    clearEmployeeData: () => void;
}

const initialState = {
    jobId: '',
    threadId: '',
    currentEmployeeId: '',
    employeeList: [
        {
            employeeId: '',
            company: '',
            employeeName: '',
            employeeJobTitle: '',
            referralDate: '',
            referralForm: {
                referralDate: '',
            },
            referralNotes: {
                consultationDate: '',
            },
        },
    ],
};

export const createEmployeeListSlice: StateCreator<IEmployeeListData> = (
    set
) => ({
    employeeData: initialState,
    updateEmployeeData: (value: IEmployeeList) => {
        set((state: IEmployeeListData) => ({
            ...state,
            employeeData: value,
        }));
    },
    clearEmployeeData: () => set({ employeeData: initialState }),
});
