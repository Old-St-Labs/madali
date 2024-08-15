import styles from './referral-notes.module.scss';

/* eslint-disable-next-line */
export interface ReferralNotesProps {}

export function ReferralNotes(props: ReferralNotesProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to ReferralNotes!</h1>
        </div>
    );
}

export default ReferralNotes;
