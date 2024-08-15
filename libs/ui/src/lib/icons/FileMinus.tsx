import IIcon from '../../types/icons';

export const FileMinus = ({ color = '#EEAF42', className }: IIcon) => {
    return (
        <svg
            width="36"
            height="44"
            className={className}
            viewBox="0 0 36 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 2H6C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6V38C2 39.0609 2.42143 40.0783 3.17157 40.8284C3.92172 41.5786 4.93913 42 6 42H30C31.0609 42 32.0783 41.5786 32.8284 40.8284C33.5786 40.0783 34 39.0609 34 38V14M22 2L34 14M22 2V14H34M12 28H24"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
