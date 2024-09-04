import { Document, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Button, Modal, Spinner, Typography } from '@ui';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useSessionStore } from '@web-app/hooks/state-management';
import { saveAs } from 'file-saver';
import { useEffect, useMemo, useState } from 'react';
import { GeneratedReportTemplatePage1 } from '../../report/generated-report/export-template-pages/generated-report-template_page-1';
import { GeneratedReportTemplatePage2 } from '../../report/generated-report/export-template-pages/generated-report-template_page-2';
import styles from './export-modal.module.scss';

/* eslint-disable-next-line */
export interface ExportModalProps {}

export function ExportModal(props: ExportModalProps) {
    // const { reportQuestions, reportAnswers } = useReportContext();
    const { reportQuestions } = useSessionStore((state) => state);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const reportPreviewData = useMemo(() => {
        return reportQuestions.map((reportQuestion) => {
            // TODO: get answers from API
            const answer =
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis provident veniam natus obcaecati, praesentium doloremque!';

            return {
                question:
                    reportQuestion.updatedQuestion === ''
                        ? reportQuestion.question
                        : reportQuestion.updatedQuestion,
                answer: answer,
            };
        });
    }, [reportQuestions]);

    useEffect(() => {
        EventEmitter.subscribe(
            EventEmitter.events.ExportReferralForm,
            setModalOpen
        );

        return () => {
            EventEmitter.unsubscribe(EventEmitter.events.ExportReferralForm);
        };
    }, []);

    const handleCancelExport = () => {
        setModalOpen(false);
    };

    const GeneratedReportDoc = () => {
        return (
            <Document>
                <GeneratedReportTemplatePage1 />
                <GeneratedReportTemplatePage2 data={reportPreviewData} />
            </Document>
        );
    };

    const handleDownloadPdf = (loading) => {
        const downloadPdf = async () => {
            const fileName = 'OH_Consultation_Report.pdf';
            const blob = await pdf(<GeneratedReportDoc />).toBlob();

            saveAs(blob, fileName);
        };

        if (!loading) {
            setTimeout(() => {
                downloadPdf();
                EventEmitter.dispatch(
                    EventEmitter.events.ExportReferralForm,
                    false
                );
            }, 5000);
        }

        return null;
    };

    return (
        <Modal
            className={styles['container']}
            isVisible={modalOpen}
            onToggle={() => setModalOpen(false)}
        >
            <Spinner isModalSpinner={true} />

            <PDFDownloadLink
                style={{ display: 'none' }}
                document={<GeneratedReportDoc />}
            >
                {({ loading }) => handleDownloadPdf(loading)}
            </PDFDownloadLink>

            <Typography
                color="text-T1"
                size="text-xl"
                fontWeight="font-semibold"
                style={{ fontSize: '1.25rem' }}
            >
                Exporting referral report
            </Typography>

            <Button
                label="Cancel Export"
                variant="text"
                size="md"
                onClick={handleCancelExport}
            />
        </Modal>
    );
}

export default ExportModal;
