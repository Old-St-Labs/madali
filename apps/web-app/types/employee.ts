export interface IYohdaRecord {
    employeeId: string;
    company: string;
    employeeName: string;
    employeeJobTitle: string;
    referralDate: string;
    referralForm: { referralDate: string };
    referralNotes: { consultationDate: string };
}

export interface IEmployee {
    statusCode: number;
    body: IYohdaRecord[];
}

export interface IEmployeeList {
    jobId: string;
    threadId: string;
    currentEmployeeId: string;
    employeeList: IYohdaRecord[];
}
