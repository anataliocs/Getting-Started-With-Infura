import { Dialog } from '@headlessui/react';
import styles from '../styles/modules/Modal.module.css';
import Card from './Card';
import IconButton from './IconButton';
import CloseIcon from './icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  props?: React.HTMLProps<HTMLDivElement>;
}

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  ...props
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      {...props}
      className={styles.modal}
    >
      <Dialog.Overlay className={styles.overlay} />

      <div className={styles.container}>
        <Card containerClassName={styles.card}>
          <div className={styles.content}>
            {/* for accessibility, title and description should be provided for screen readers */}
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>

            {children}

            <IconButton
              className={styles.close_button}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Card>
      </div>
    </Dialog>
  );
};

export default Modal;
