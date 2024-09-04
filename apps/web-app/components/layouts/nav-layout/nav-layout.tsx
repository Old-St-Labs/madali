import { useStore } from '@data-access/state-management';
import { Button, User } from '@ui';
import { STORAGE_KEY } from '@web-app/config/constants';
import { useSessionStore } from '@web-app/hooks/state-management';
import HEADER_LOGO from '@web-app/public/assets/navlayout_logo.png';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styles from './nav-layout.module.scss';

export interface NavLayoutProps {
    children: ReactNode;
}

export function NavLayout({ children }: NavLayoutProps) {
    const router = useRouter();
    const clearAuthedUser = useStore((state) => state.clearAuthedUser);
    const { clearEmployeeData, clearReportQuestions } = useSessionStore(
        (state) => state
    );

    const handleLogout = () => {
        Cookies.remove(STORAGE_KEY.ACCESS_TOKEN);
        clearAuthedUser();
        clearEmployeeData();
        clearReportQuestions();

        router.replace('/auth/login');
    };

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['container__items']}>
                    <div
                        className="relative"
                        style={{ width: '2.375rem', height: '2.313rem' }}
                    >
                        <Image src={HEADER_LOGO} alt="Latus Group Logo" fill />
                    </div>
                    <p className="font-semibold">REFERRAL REPORT</p>
                </div>

                <div className={styles['container__items']}>
                    <div className="flex gap-3 items-center">
                        <User />
                        <p>John Smith</p>
                    </div>

                    <Button label="Logout" onClick={handleLogout} />
                </div>
            </div>
            {children}
        </>
    );
}

export default NavLayout;
