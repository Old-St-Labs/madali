import { Input, Send, Typography } from '@ui';
import GeneratedReportPreview from './generated-report-preview/generated-report-preview';
import styles from './generated-report.module.scss';

/* eslint-disable-next-line */
export interface GeneratedReportProps {}

export function GeneratedReport(props: GeneratedReportProps) {
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
