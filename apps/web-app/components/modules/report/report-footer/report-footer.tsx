import { Button, ChevronLeft, ChevronRight } from '@ui';
import { REPORT_VIEW } from '@web-app/config/constants';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useReportContext } from '@web-app/context/reportContext';
import { ViewReportDisplay } from '@web-app/types/report';
import { useRouter } from 'next/router';
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';
import styles from './report-footer.module.scss';

/* eslint-disable-next-line */
export interface ReportFooterProps {}

export function ReportFooter(props: ReportFooterProps) {
    const { currentView, updateCurrentView } = useReportContext();
    const [progress, setProgress] = useState<number>(50);
    const router = useRouter();

    const handleBackToView = () => {
        EventEmitter.dispatch(
            EventEmitter.events.CancelExportReferralForm,
            true
        );
    };

    useEffect(() => {
        setProgress(currentView === REPORT_VIEW.GENERATED_REPORT ? 100 : 50);
    }, [currentView]);

    return (
        <div className={styles['container']}>
            <Line
                percent={progress}
                strokeWidth={1}
                trailWidth={1}
                strokeColor="#039197"
                trailColor="#B1DDDF"
                strokeLinecap="square"
                className={styles['container__progress-bar']}
            />

            <div className={styles['container__button-group']}>
                <Button
                    label={
                        currentView === REPORT_VIEW.GENERATED_REPORT
                            ? 'Back'
                            : 'Back to search'
                    }
                    variant="secondary"
                    size="sm"
                    leftIcon={ChevronLeft}
                    onClick={() =>
                        currentView === REPORT_VIEW.GENERATED_REPORT
                            ? handleBackToView()
                            : router.push('/search')
                    }
                />

                {currentView !== REPORT_VIEW.GENERATED_REPORT && (
                    <Button
                        label="Generate Report"
                        variant="primary"
                        size="sm"
                        rightIcon={ChevronRight}
                        onClick={() =>
                            updateCurrentView(
                                REPORT_VIEW.GENERATED_REPORT as ViewReportDisplay
                            )
                        }
                    />
                )}

                {currentView === REPORT_VIEW.GENERATED_REPORT && (
                    <Button
                        label="Export to PDF"
                        variant="primary"
                        size="sm"
                        onClick={() =>
                            EventEmitter.dispatch(
                                EventEmitter.events.ExportReferralForm,
                                true
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default ReportFooter;
