import { Report } from '@data-access/api';
import { LLMDataDto } from '@dto';
import { useMutation } from '@tanstack/react-query';
import { IGenerateReportData } from '@web-app/types/report';

export const useMutateGenerateReport = () => {
    return useMutation({
        mutationFn: (data: LLMDataDto) => {
            return Report.postGenerateReport<IGenerateReportData>(data);
        },
    });
};
