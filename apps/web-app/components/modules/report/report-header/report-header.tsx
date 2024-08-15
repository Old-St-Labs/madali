import { Button, Typography } from '@ui';
import styles from './report-header.module.scss';

/* eslint-disable-next-line */
export interface ReportHeaderProps {}

export function ReportHeader(props: ReportHeaderProps) {
    return (
        <div className={styles['container']}>
            <div>
                <div className="mb-3">
                    <Typography
                        color="text-T1"
                        size="text-3xl"
                        fontWeight="font-semibold"
                    >
                        J188234
                    </Typography>

                    <div className="flex gap-2 items-center">
                        <Typography
                            color="text-B800"
                            size="text-base"
                            fontWeight="font-semibold"
                        >
                            BooHoo
                        </Typography>

                        <div className={styles['container__separator']} />

                        <Typography color="text-B800" size="text-base">
                            London NW24
                        </Typography>
                    </div>
                </div>

                <Button label="View List" variant="secondary" size="sm" />
            </div>

            <div className={styles['container__right']}>
                <div className="flex gap-2 items-center">
                    <Typography
                        color="text-B700"
                        size="text-base"
                        fontWeight="font-semibold"
                    >
                        12 Jun 2024 8:34 PM
                    </Typography>

                    <div className={styles['container__separator']} />

                    <Typography color="text-B700" size="text-base">
                        John Smith
                    </Typography>
                </div>

                <Typography color="text-B600" size="text-sm">
                    Last update
                </Typography>
            </div>
        </div>
    );
}

export default ReportHeader;
