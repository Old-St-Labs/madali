import { useMutation } from '@tanstack/react-query';
import { Report } from '../../../../libs/data-access/src/api';
import { LLMInjectMessageDto } from '../../../../libs/dto/src';
import { IGenerateReportData } from './../../types/report';

export const useMutateGenerateReportMessage = () => {
    return useMutation({
        mutationFn: (data: LLMInjectMessageDto) => {
            return Report.postGenerateReportMessage<IGenerateReportData>(data);
        },
    });
};
