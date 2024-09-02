/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosConfig } from './axiosConfig';

const API_EMPLOYEE = '/yohda-integration';

class EmployeeApi extends AxiosConfig {
    constructor() {
        super(process.env.API_EMPLOYEE_URL, true, true, true);
    }

    public getEmployeesByJobNumber = async <T>(
        jobNumber: string
    ): Promise<T> => {
        return await this.axiosInstance.get(`${API_EMPLOYEE}/job/${jobNumber}`);
    };
}

const Employee = new EmployeeApi();
export { Employee };
