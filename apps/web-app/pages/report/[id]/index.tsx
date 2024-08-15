import NavLayout from '@web-app/components/layouts/nav-layout/nav-layout';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import ReportQuestionsModal from '@web-app/components/modules/modals/report-questions-modal/report-questions-modal';
import ReportFooter from '@web-app/components/modules/report/report-footer/report-footer';
import ReportHeader from '@web-app/components/modules/report/report-header/report-header';
import { ViewReport } from '@web-app/components/modules/report/view-report/view-report';
import { ReportContextProvider } from '@web-app/context/reportContext';
import { NextPageWithLayout } from '@web-app/types/pages';
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface ViewProps {}

const View: NextPageWithLayout<ViewProps> = () => {
    return (
        <ReportContextProvider>
            <ReportQuestionsModal />

            <div className={styles['container']}>
                <ReportHeader />
                <ViewReport />
                <ReportFooter />
            </div>
        </ReportContextProvider>
    );
};

export default View;

View.getLayout = (page) => {
    return (
        <PrimaryLayout title="Latus Group | View Report">
            <NavLayout>{page}</NavLayout>
        </PrimaryLayout>
    );
};
