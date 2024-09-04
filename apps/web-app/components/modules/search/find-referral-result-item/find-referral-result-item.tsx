import { YohdaRecordDto } from '@dto';
import { Button, Typography } from '@ui';
import { useSessionStore } from '@web-app/hooks/state-management';
import { useRouter } from 'next/router';
import styles from './find-referral-result-item.module.scss';

/* eslint-disable-next-line */
export interface FindReferralResultItemProps {
    id: number; //temporary id
    data: YohdaRecordDto;
}

export function FindReferralResultItem({
    id,
    data,
}: FindReferralResultItemProps) {
    const router = useRouter();
    const { employeeData, updateEmployeeData } = useSessionStore(
        (state) => state
    );
    const { employeeName, employeeId, employeeJobTitle, company } = data;

    const handleClick = () => {
        updateEmployeeData({
            ...employeeData,
            currentEmployeeId: employeeId,
        });

        router.push(`/report/${employeeId}`);
    };

    return (
        <div className={styles['container']}>
            <div className={styles['container__details']}>
                <Typography
                    color="text-T1"
                    size="text-2xl"
                    fontWeight="font-semibold"
                >
                    {employeeName}
                </Typography>

                <div className="flex gap-2 items-center">
                    <Typography color="text-T2" size="text-base">
                        {employeeJobTitle}
                    </Typography>

                    <div className={styles['container__details-separator']} />

                    <Typography color="text-T2" size="text-base">
                        {company}
                    </Typography>
                </div>
            </div>

            <Button
                label="View and generate report"
                variant="primary"
                onClick={handleClick}
            />
        </div>
    );
}

export default FindReferralResultItem;
