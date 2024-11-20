import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button 
                    type="button"
                    className={styles.closeButton} 
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal; 