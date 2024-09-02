export type ViewReportDisplay =
    | 'REFERRAL_FORM'
    | 'REFERRAL_NOTES'
    | 'GENERATED_REPORT';

export interface IReportQuestion {
    id: number;
    question: string;
}

export interface IReportAnswer {
    questionId: number;
    answer: string;
}

export interface IReportPreviewData {
    id: number;
    question: string;
    answer: string;
}

export interface IPrefinedQuestion {
    predefinedQuestionId: string;
    questionType: string;
    question: string;
}
