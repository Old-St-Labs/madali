import { Typography } from '@ui';
import { useSessionStore } from '@web-app/hooks/state-management';
import { useMemo } from 'react';
import GeneratedReportQuestion from '../generated-report-question/generated-report-question';
import styles from './generated-report-preview.module.scss';

/* eslint-disable-next-line */
export interface GeneratedReportPreviewProps {}

export function GeneratedReportPreview(props: GeneratedReportPreviewProps) {
    const { reportQuestions } = useSessionStore((state) => state);

    const reportPreviewData = useMemo(() => {
        return reportQuestions?.map((report) => {
            // TODO: get answers from API
            const answer =
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis provident veniam natus obcaecati, praesentium doloremque!';

            return {
                question:
                    report.updatedQuestion === ''
                        ? report.question
                        : report.updatedQuestion,
                answer: answer,
            };
        });
    }, [reportQuestions]);

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <div className={styles['container__header-employee']}>
                    <Typography
                        color="text-T2"
                        fontWeight="font-semibold"
                        size="text-lg"
                    >
                        Joe Bloggs
                    </Typography>

                    <Typography color="text-T2" size="text-base">
                        Employee
                    </Typography>
                </div>

                <div className={styles['container__header-employee']}>
                    <Typography
                        color="text-T2"
                        fontWeight="font-semibold"
                        size="text-lg"
                    >
                        2 Feb. 1985
                    </Typography>

                    <Typography color="text-T2" size="text-base">
                        DOB
                    </Typography>
                </div>

                <div className={styles['container__header-employee']}>
                    <Typography
                        color="text-T2"
                        fontWeight="font-semibold"
                        size="text-lg"
                    >
                        Asst. Merchandiser
                    </Typography>

                    <Typography color="text-T2" size="text-base">
                        Job
                    </Typography>
                </div>
            </div>

            <div className={styles['container__questions']}>
                {reportPreviewData.map((data, i) => (
                    <GeneratedReportQuestion
                        key={i}
                        order={i + 1}
                        data={data}
                    />
                ))}
            </div>
        </div>
    );
}

export default GeneratedReportPreview;
