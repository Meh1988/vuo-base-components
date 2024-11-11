import { Modal } from '../molecules/Modal';
import LoginComponent from './LoginComponent';
import Button from '../atoms/Button';
import { observer } from 'mobx-react-lite';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = observer(({ isOpen, onClose }: LoginModalProps) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Login or Register"
        footer={
          <Button variant="small" color="tertiary" onClick={onClose}>
            Close
          </Button>
        }
      >
        <LoginComponent />
      </Modal>
    );
  });

export default LoginModal; 