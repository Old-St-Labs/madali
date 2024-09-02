import { useQuery } from '@tanstack/react-query';
import { Employee } from '../../../../libs/data-access/src/api';
import { IEmployee } from '../../types/employee';

export const useQueryEmployeeListByJobNumber = (
    jobNumber: string,
    isEnabled: boolean
) => {
    const {
        data: employeeData,
        isFetching: isFetchingEmployeeData,
        status: employeeDataStatus,
        refetch: refetchEmployeeData,
    } = useQuery({
        queryKey: ['employee-list'],
        queryFn: () => Employee.getEmployeesByJobNumber<IEmployee>(jobNumber),
        enabled: isEnabled,
    });

    return {
        employeeData,
        isFetchingEmployeeData,
        employeeDataStatus,
        refetchEmployeeData,
    };
};
