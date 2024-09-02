import { YohdaRecordDto } from '@dto';
import { StateCreator } from 'zustand';

export interface IEmployeeList {
    employeeList: Partial<YohdaRecordDto>[];
    updateEmployeeList: (values: Partial<YohdaRecordDto>[]) => void;
    clearEmployeeList: () => void;
}

const initialState = [
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
];

export const createEmployeeListSlice: StateCreator<IEmployeeList> = (set) => ({
    employeeList: initialState,
    updateEmployeeList: (value: Partial<YohdaRecordDto>[]) => {
        set((state: IEmployeeList) => ({
            ...state,
            employeeList: value,
        }));
    },
    clearEmployeeList: () => set({ employeeList: initialState }),
});
