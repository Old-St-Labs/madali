import { YohdaRecordDto } from '@dto';
import { Button, Pen, Typography } from '@ui';
import { REPORT_VIEW } from '@web-app/config/constants';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useReportContext } from '@web-app/context/reportContext';
import { useSessionStore } from '@web-app/hooks/state-management';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './report-sidenav.module.scss';

type ReportSideNavTabs = 'Referral Form' | 'Referral Notes';
/* eslint-disable-next-line */
export interface ReportSidenavProps {}

export function ReportSidenav(props: ReportSidenavProps) {
    const { currentView } = useReportContext();
    const router = useRouter();

    const { employeeList } = useSessionStore((state) => state);

    const [selectedTab, setSelectedTab] =
        useState<ReportSideNavTabs>('Referral Form');

    const [selectedEmployee, setSelectedEmployee] =
        useState<Partial<YohdaRecordDto>>();

    const findEmployee = () => {
        const { id } = router.query;
        const employeeId = (id as string)?.split('-')[0];
        const foundEmployee = employeeList.find(
            (employee) => employee.employeeId === employeeId
        );

        setSelectedEmployee(foundEmployee);
    };

    useEffect(() => {
        findEmployee();
    }, []);

    return (
        <div className={styles['container']}>
            <Typography
                color="text-T1"
                size="text-2xl"
                fontWeight="font-semibold"
            >
                {selectedEmployee?.employeeName}
            </Typography>

            <div className="flex gap-2 items-center">
                <Typography color="text-T2" size="text-base">
                    {selectedEmployee?.employeeJobTitle}
                </Typography>

                <div className={styles['container__separator']} />

                <Typography color="text-T2" size="text-base">
                    {selectedEmployee?.company}
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
