import { REPORT_VIEW } from '@web-app/config/constants';
import { useReportContext } from '@web-app/context/reportContext';
import CancelExportModal from '../../modals/cancel-export-modal/cancel-export-modal';
import ExportModal from '../../modals/export-modal/export-modal';
import GeneratedReport from '../generated-report/generated-report';
import ReferralForm from '../referral-form/referral-form';
import ReferralNotes from '../referral-notes/referral-notes';
import ReportSidenav from '../report-sidenav/report-sidenav';
import styles from './view-report.module.scss';

/* eslint-disable-next-line */
export interface ViewReportProps {}

export function ViewReport(props: ViewReportProps) {
    const { currentView } = useReportContext();

    return (
        <div className={styles['container']}>
            <ExportModal />
            <CancelExportModal />
            <ReportSidenav />

            {currentView === REPORT_VIEW.REFERRAL_FORM && <ReferralForm isLoading={false} />}
            {currentView === REPORT_VIEW.REFERRAL_NOTES && <ReferralNotes />}
            {currentView === REPORT_VIEW.GENERATED_REPORT && <GeneratedReport />}
        </div>
    );
}

export default ViewReport;
