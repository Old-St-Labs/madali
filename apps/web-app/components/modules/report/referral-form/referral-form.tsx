import { Document, PDFViewer } from '@react-pdf/renderer';
import { Spinner } from '@ui';
import { useEffect, useState } from 'react';
import styles from './referral-form.module.scss';
import { ReferralFormPage1 } from './template-pages/referral-form_page-1';
import { ReferralFormPage2 } from './template-pages/referral-form_page-2';
import { ReferralFormPage3 } from './template-pages/referral-form_page-3';
import { ReferralFormPage4 } from './template-pages/referral-form_page-4';

/* eslint-disable-next-line */
export interface ReferralFormProps {
    isLoading: boolean;
}

export function ReferralForm({ isLoading }: ReferralFormProps) {
    const [isClient, setIsClient] = useState(false);

    // TODO: Add page resize checker and PDF loader
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isLoading && (
                <div className={styles['spinner-container']}>
                    <Spinner isModalSpinner={true} />
                </div>
            )}

            {!isLoading && (
                <div className={styles['container']}>
                    {isClient && (
                        <PDFViewer
                            style={{ width: '100%', height: '100vh' }}
                            showToolbar={false}
                        >
                            <Document>
                                <ReferralFormPage1 />
                                <ReferralFormPage2 />
                                <ReferralFormPage3 />
                                <ReferralFormPage4 />
                            </Document>
                        </PDFViewer>
                    )}
                </div>
            )}
        </>
    );
}

export default ReferralForm;
