import { YohdaRecordDto } from '@dto';
import { Button, Typography } from '@ui';
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
    const { employeeName, employeeId, employeeJobTitle, company } = data;

    const handleClick = () => {
        router.push(`/report/${employeeId}-${id}`);
    };

    console.log(employeeName, employeeJobTitle, company);

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
