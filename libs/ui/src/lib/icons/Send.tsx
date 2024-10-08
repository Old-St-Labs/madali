import IIcon from '../../types/icons';

export const Send = ({ color = '#039197', className }: IIcon) => {
    return (
        <svg
            width="20"
            height="18"
            className={className}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.4 17.4L18.85 9.92C19.66 9.57 19.66 8.43 18.85 8.08L1.4 0.600002C0.74 0.310002 0.00999999 0.800002 0.00999999 1.51L0 6.12C0 6.62 0.37 7.05 0.87 7.11L15 9L0.87 10.88C0.37 10.95 0 11.38 0 11.88L0.00999999 16.49C0.00999999 17.2 0.74 17.69 1.4 17.4Z"
                fill={color}
            />
        </svg>
    );
};
