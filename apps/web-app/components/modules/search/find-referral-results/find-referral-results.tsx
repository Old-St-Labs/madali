import { Typography } from '@ui';
import FindReferralResultItem from '../find-referral-result-item/find-referral-result-item';
import styles from './find-referral-results.module.scss';

/* eslint-disable-next-line */
export interface FindReferralResultsProps {}

export function FindReferralResults(props: FindReferralResultsProps) {
    const headerData = [
        {
            header: 'Francis Paulson',
            subheader: 'Resource name',
            bottomHeader: '4 Jun 2024 3:42 PM',
            bottomSubheader: 'Last sync',
        },
        {
            header: '12 Jun 2024 2:00 PM',
            subheader: 'Scheduled date',
            bottomHeader: '8 Jun 2024 1:24 PM',
            bottomSubheader: 'Schedule created on',
        },
    ];

    const resultItems = [
        {
            name: 'Joe Bloggs',
            position: 'Asst. Merchandiser',
            department: 'Merch',
        },
        {
            name: 'Paul Finch',
            position: 'Asst. Merchandiser',
            department: 'Merch',
        },
    ];

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['container__header']}>
                    <div className={styles['container__header-left']}>
                        <div>
                            <Typography
                                color="text-B800"
                                size="text-xl"
                                fontWeight="font-semibold"
                            >
                                BooHoo
                            </Typography>

                            <Typography color="text-B600" size="text-base">
                                London NW24
                            </Typography>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <Typography
                                    color="text-B800"
                                    size="text-lg"
                                    fontWeight="font-semibold"
                                >
                                    12 Jun 2024 8:34 PM
                                </Typography>

                                <Typography color="text-B600" size="text-sm">
                                    Last update
                                </Typography>
                            </div>

                            <Typography
                                color="text-B800"
                                size="text-lg"
                                fontWeight="font-semibold"
                            >
                                John Smith
                            </Typography>
                        </div>
                    </div>

                    <div className={styles['container__header-right']}>
                        {headerData.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col justify-between w-1/2"
                            >
                                <div>
                                    <Typography
                                        color="text-B800"
                                        size="text-base"
                                        fontWeight="font-semibold"
                                    >
                                        {item.header}
                                    </Typography>

                                    <Typography
                                        color="text-B600"
                                        size="text-sm"
                                    >
                                        {item.subheader}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        color="text-B800"
                                        size="text-base"
                                        fontWeight="font-semibold"
                                    >
                                        {item.bottomHeader}
                                    </Typography>

                                    <Typography
                                        color="text-B600"
                                        size="text-sm"
                                    >
                                        {item.bottomSubheader}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TODO: Make this scrollable */}
            <div className={styles['container__list']}>
                {resultItems.map((item, i) => (
                    <FindReferralResultItem key={i} data={item} />
                ))}
            </div>
        </>
    );
}

export default FindReferralResults;
