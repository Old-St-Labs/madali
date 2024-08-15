import { Button, Typography } from '@ui';
import { useRouter } from 'next/router';
import styles from './find-referral-result-item.module.scss';

/* eslint-disable-next-line */
export interface FindReferralResultItemProps {
    data: { name: string; position: string; department: string };
}

export function FindReferralResultItem({
    data: { name, position, department },
}: FindReferralResultItemProps) {
    const router = useRouter();

    const handleClick = () => {
        // router.push(`/report/${id}`);
        router.push('/report/001');
    };

    return (
        <div className={styles['container']}>
            <div className={styles['container__details']}>
                <Typography
                    color="text-T1"
                    size="text-2xl"
                    fontWeight="font-semibold"
                >
                    {name}
                </Typography>

                <div className="flex gap-2 items-center">
                    <Typography color="text-T2" size="text-base">
                        {position}
                    </Typography>

                    <div className={styles['container__details-separator']} />

                    <Typography color="text-T2" size="text-base">
                        {department}
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
