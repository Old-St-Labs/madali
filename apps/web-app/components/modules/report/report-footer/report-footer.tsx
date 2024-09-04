import { Button, ChevronLeft, ChevronRight } from '@ui';
import { REPORT_VIEW } from '@web-app/config/constants';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useReportContext } from '@web-app/context/reportContext';
import { useMutateGenerateReport } from '@web-app/hooks/query/useMutateGenerateReport';
import { useSessionStore } from '@web-app/hooks/state-management';
import { ViewReportDisplay } from '@web-app/types/report';
import { useRouter } from 'next/router';
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';
import styles from './report-footer.module.scss';

/* eslint-disable-next-line */
export interface ReportFooterProps {}

export function ReportFooter(props: ReportFooterProps) {
    const { currentView, updateCurrentView } = useReportContext();
    const { employeeData, reportQuestions, updateEmployeeData } =
        useSessionStore((state) => state);
    const generateReport = useMutateGenerateReport();
    const [progress, setProgress] = useState<number>(50);
    const router = useRouter();

    const handleBackToView = () => {
        EventEmitter.dispatch(
            EventEmitter.events.CancelExportReferralForm,
            true
        );
    };

    const handleGenerateReport = () => {
        const employeeId = router.query.id;
        const foundEmployee = employeeData.employeeList.find(
            (employee) => employee.employeeId === employeeId
        );

        const filteredQuestions = reportQuestions.map((question) => ({
            question: question.question,
            questionType: question.questionType,
            response: '',
        }));

        if (!foundEmployee) return;

        const reportData = {
            jobId: employeeData.jobId,
            referralNote: {
                employeeId: foundEmployee.employeeId,
                employeeName: foundEmployee.employeeName,
                referralDate: foundEmployee.referralNotes.consultationDate,
            },
            referralForm: {
                employeeId: foundEmployee.employeeId,
                employeeName: foundEmployee.employeeName,
                referralDate: foundEmployee.referralForm.referralDate,
            },
            questions: filteredQuestions,
        };

        generateReport.mutate(reportData);
    };

    useEffect(() => {
        if (generateReport.status === 'success') {
            updateEmployeeData({
                ...employeeData,
                threadId: generateReport.data.body.threadId,
            });

            updateCurrentView(
                REPORT_VIEW.GENERATED_REPORT as ViewReportDisplay
            );
        }
    }, [generateReport.status]);

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
                        onClick={handleGenerateReport}
                        isProcessing={generateReport.isLoading}
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
