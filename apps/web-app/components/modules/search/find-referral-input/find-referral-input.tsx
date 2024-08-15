import { Button, Input, SearchOutline, Typography } from '@ui';
// import SearchState from '../search-state/search-state';
import FindReferralResults from '../find-referral-results/find-referral-results';
import styles from './find-referral-input.module.scss';

/* eslint-disable-next-line */
export interface FindReferralInputProps {}

export function FindReferralInput(props: FindReferralInputProps) {
    return (
        <>
            <div className={styles['container']}>
                <Typography
                    size="text-base"
                    fontWeight="font-semibold"
                    className="text-T1"
                >
                    Job Number
                </Typography>

                <div className={styles['container__input-group']}>
                    <Input
                        label=""
                        leftIcon={SearchOutline}
                        placeholder="Search by job number..."
                        className={styles['container__input-input']}
                    />

                    <Button
                        label="Search"
                        className={styles['container__input-button']}
                        variant="primary"
                    />
                </div>
            </div>

            {/* <SearchState searchState="default" /> */}
            <FindReferralResults />
        </>
    );
}

export default FindReferralInput;
