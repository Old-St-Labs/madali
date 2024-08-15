import { Input, Typography } from '@ui';
import styles from './generated-report-question.module.scss';

/* eslint-disable-next-line */
export interface GeneratedReportQuestionProps {
    order: number;
    data: {
        question: string;
        answer: string;
    };
}

export function GeneratedReportQuestion({
    order,
    data,
}: GeneratedReportQuestionProps) {
    return (
        <div className={styles['container']}>
            <Typography
                size="text-lg"
                fontWeight="font-semibold"
                color="text-T2"
                className="mb-3"
            >
                QUESTION {order}
            </Typography>

            <Typography
                size="text-lg"
                fontWeight="font-semibold"
                color="text-T2"
            >
                {data?.question}
            </Typography>

            <Input
                type="text"
                className="w-full"
                component="textarea"
                numOfRows={5}
                value={data?.answer}
            />
        </div>
    );
}

export default GeneratedReportQuestion;
