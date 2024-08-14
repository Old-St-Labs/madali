import IIcon from '../../types/icons';

export const Alert = ({ size = 32, color, className }: IIcon) => {
    return (
        <svg
            width={size}
            height={size}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13M12 16H11.99M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};