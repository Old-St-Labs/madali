import { Button, Modal, Typography, XOutline } from '@ui';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './cancel-export-modal.module.scss';

/* eslint-disable-next-line */
export interface CancelExportModalProps {}

export function CancelExportModal(props: CancelExportModalProps) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        EventEmitter.subscribe(
            EventEmitter.events.CancelExportReferralForm,
            setModalOpen
        );

        return () => {
            EventEmitter.unsubscribe(
                EventEmitter.events.CancelExportReferralForm
            );
        };
    }, []);

    const handleLeavePage = () => {
        router.push('/search');
    };

    const handleStayOnPage = () => {
        setModalOpen(false);
    };

    return (
        <Modal
            className={styles['container']}
            isVisible={modalOpen}
            onToggle={() => setModalOpen(false)}
        >
            <div className={styles['close-btn']} onClick={handleStayOnPage}>
                <XOutline size={22} className={styles['hover-fill']} />
            </div>

            <Typography
                color="text-T1"
                size="text-xl"
                fontWeight="font-semibold"
                style={{ marginBottom: 25, fontSize: '1.25rem' }}
            >
                Leave page without exporting?
            </Typography>

            <Typography
                color="text-T1"
                size="text-base"
                fontWeight="font-normal"
                style={{ marginBottom: 39 }}
            >
                Changes you made will not be saved.
            </Typography>

            <div className={styles['button-row']}>
                <Button
                    label="Leave"
                    variant="error"
                    size="md"
                    onClick={handleLeavePage}
                />

                <Button
                    label="Stay on page"
                    variant="text"
                    size="md"
                    onClick={handleStayOnPage}
                />
            </div>
        </Modal>
    );
}

export default CancelExportModal;
