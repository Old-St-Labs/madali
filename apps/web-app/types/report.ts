export type ViewReportDisplay =
    | 'REFERRAL_FORM'
    | 'REFERRAL_NOTES'
    | 'GENERATED_REPORT';

export interface IReportAnswer {
    questionId: number;
    answer: string;
}

export interface IReportPreviewData {
    id: number;
    question: string;
    answer: string;
}

export interface IReportQuestion {
    id: string;
    questionType: string;
    question: string;
    updatedQuestion: string;
}

export interface IPredefinedQuestion {
    predefinedQuestionId: string;
    questionType: string;
    question: string;
}

export interface IPredefinedQuestions {
    statusCode: number;
    body: IPredefinedQuestion[];
}

export interface ILLMReport {
    jobId: string;
    generatedReport: string;
    threadId: string;
}

export interface IGenerateReportData {
    statusCode: number;
    body: ILLMReport;
    message?: string;
    error?: string;
}
