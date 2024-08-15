import { Button, Pen, Typography } from '@ui';
import { REPORT_VIEW } from '@web-app/config/constants';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useReportContext } from '@web-app/context/reportContext';
import cn from 'classnames';
import { useState } from 'react';
import styles from './report-sidenav.module.scss';

type ReportSideNavTabs = 'Referral Form' | 'Referral Notes';
/* eslint-disable-next-line */
export interface ReportSidenavProps {}

export function ReportSidenav(props: ReportSidenavProps) {
    const { currentView } = useReportContext();
    const [selectedTab, setSelectedTab] =
        useState<ReportSideNavTabs>('Referral Form');

    return (
        <div className={styles['container']}>
            <Typography
                color="text-T1"
                size="text-2xl"
                fontWeight="font-semibold"
            >
                Joe Bloggs
            </Typography>

            <div className="flex gap-2 items-center">
                <Typography color="text-T2" size="text-base">
                    Asst. Merchandiser
                </Typography>

                <div className={styles['container__separator']} />

                <Typography color="text-T2" size="text-base">
                    Merch
                </Typography>
            </div>

            <div className={styles['container__sidenav-items']}>
                {currentView !== REPORT_VIEW.GENERATED_REPORT && (
                    <>
                        {['Referral Form', 'Referral Notes'].map(
                            (tab: ReportSideNavTabs) => (
                                <div
                                    key={tab}
                                    className={cn(
                                        styles['container__sidenav-item'],
                                        {
                                            [styles['-active']]:
                                                selectedTab === tab,
                                        }
                                    )}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    <Typography
                                        color={
                                            selectedTab === tab
                                                ? 'text-T4'
                                                : 'text-T2'
                                        }
                                        size="text-base"
                                        fontWeight="font-semibold"
                                    >
                                        {tab}
                                    </Typography>
                                </div>
                            )
                        )}
                    </>
                )}

                {currentView === REPORT_VIEW.GENERATED_REPORT && (
                    <Button
                        className="mt-4 w-full"
                        label="Update report questions"
                        variant="secondary"
                        size="sm"
                        leftIcon={Pen}
                        onClick={() =>
                            EventEmitter.dispatch(
                                EventEmitter.events.UpdateReportQuestion,
                                true
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default ReportSidenav;
