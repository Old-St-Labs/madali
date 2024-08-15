import { Button, User } from '@ui';
import HEADER_LOGO from '@web-app/public/assets/navlayout_logo.png';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './nav-layout.module.scss';

export interface NavLayoutProps {
    children: ReactNode;
}

export function NavLayout({ children }: NavLayoutProps) {
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

                    <Button label="Logout" />
                </div>
            </div>
            {children}
        </>
    );
}

export default NavLayout;
