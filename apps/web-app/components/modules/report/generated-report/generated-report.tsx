import { Input, Send, Typography } from '@ui';
import { useMutateGenerateReportMessage } from '@web-app/hooks/query/useMutateGenerateReportMessage';
import { useSessionStore } from '@web-app/hooks/state-management';
import { useState } from 'react';
import GeneratedReportPreview from './generated-report-preview/generated-report-preview';
import styles from './generated-report.module.scss';

/* eslint-disable-next-line */
export interface GeneratedReportProps {}

export function GeneratedReport(props: GeneratedReportProps) {
    const [prompt, setPrompt] = useState<string>('');
    const { employeeData } = useSessionStore((state) => state);
    const generateReportMessage = useMutateGenerateReportMessage();

    const handleSend = () => {
        generateReportMessage.mutate({
            threadId: employeeData.threadId,
            message: prompt,
            jobId: employeeData.jobId,
        });
    };

    return (
        <div className={styles['container']}>
            <div className={styles['container__header']}>
                <Typography
                    color="text-T1"
                    size="text-2xl"
                    fontWeight="font-semibold"
                >
                    Generated Report
                </Typography>

                <Typography color="text-T2" size="text-lg">
                    Feel free to adjust the phrasing or sentence structure as
                    needed.
                </Typography>

                <div>
                    <Input
                        label=""
                        rightIcon={Send}
                        onChange={(value) => setPrompt(value as string)}
                        onRightIconClick={handleSend}
                        placeholder="Refine the generated report with a prompt"
                        className={styles['container__input']}
                    />
                </div>
            </div>

            <div className={styles['container__body']}>
                <GeneratedReportPreview />
            </div>
        </div>
    );
}

export default GeneratedReport;
