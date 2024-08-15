import { LoadingRound } from '../../icons';
import { Loading } from '../../icons/Loading';
import styles from './spinner.module.scss';

/* eslint-disable-next-line */
export interface SpinnerProps {
    size?: number
    color?: string
    secondaryColor?: string
    isModalSpinner?: boolean
}

export function Spinner({
    size = 16,
    color = undefined,
    secondaryColor = undefined,
    isModalSpinner = false
}: SpinnerProps) {
    return (
        <>
            {!isModalSpinner && <Loading color={color} secondaryColor={secondaryColor} size={size} className={styles.spinner} />}
            {isModalSpinner && <LoadingRound className={styles.spinner} />}
        </>

    );
}

export default Spinner;
