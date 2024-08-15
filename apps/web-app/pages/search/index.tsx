import { Typography } from '@ui';
import NavLayout from '@web-app/components/layouts/nav-layout/nav-layout';
import PrimaryLayout from '@web-app/components/layouts/primary-layout/primary-layout';
import FindReferralInput from '@web-app/components/modules/search/find-referral-input/find-referral-input';
import { NextPageWithLayout } from '@web-app/types/pages';
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface SearchProps {}

const Search: NextPageWithLayout<SearchProps> = () => {
    return (
        <div className={styles['container']}>
            <div>
                <Typography
                    size="text-3xl"
                    fontWeight="font-semibold"
                    className="text-T1"
                >
                    Find Referral Form and Notes
                </Typography>

                <Typography size="text-base" className="text-T2">
                    Search and choose referral form and corresponding notes for
                    report generation.
                </Typography>
            </div>

            <FindReferralInput />
        </div>
    );
};

export default Search;

Search.getLayout = (page) => {
    return (
        <PrimaryLayout title="Latus Group | Search">
            <NavLayout>{page}</NavLayout>
        </PrimaryLayout>
    );
};
