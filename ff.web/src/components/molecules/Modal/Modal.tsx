import { CloseOutlined } from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import { motion } from "framer-motion";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
  footerContent?: React.ReactNode | React.ReactNode[];
}

export const Modal = ({
  title,
  isOpen = false,
  onClose,
  children,
  footerContent,
}: ModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={`${styles.modal} ${isOpen ? styles["modal--open"] : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            <h2 className={styles.modal__title}>{title}</h2>
            {onClose && (
              <Button
                onClick={onClose}
                aria-label="Close modal"
                variant="small"
                color="tertiary"
                className={styles.modal__close}
              >
                <CloseOutlined />
              </Button>
            )}
          </div>
          <div className={styles.modal__body}>{children}</div>

          <div className={styles.modal__footer}>{footerContent}</div>
        </div>
      </div>
    </motion.div>
  );
};
