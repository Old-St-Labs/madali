import { PredefinedQuestion } from '@data-access/api';
import { useQuery } from '@tanstack/react-query';
import { IPredefinedQuestions } from '@web-app/types/report';

export const useQueryReportQuestions = () => {
    const { data: reportQuestions, isFetching: isFetchingReportQuestions } =
        useQuery({
            queryKey: ['report-questions'],
            queryFn: () =>
                PredefinedQuestion.getPredefinedQuestions<IPredefinedQuestions>(),
        });

    return {
        reportQuestions,
        isFetchingReportQuestions,
    };
};
