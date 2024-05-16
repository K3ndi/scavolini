import {Flex, Modal} from 'antd';

interface UserInfoModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  return (
    <div>
      <Modal title="Informazioni" open={open} onOk={onOk} onCancel={onCancel}>
        <Flex gap={10}>
          <h4>Utente:</h4>
          <h4>TESTPERSON</h4>
        </Flex>
        <Flex gap={10}>
          <h4>Reparto:</h4>
          <h4>TESTPERSON</h4>
        </Flex>
        <Flex gap={10}>
          <h4>Versione:</h4>
          <h4>TESTPERSON</h4>
        </Flex>
        <Flex gap={10}>
          <h4>WebService:</h4>
          <h4>Sviluppo</h4>
        </Flex>
      </Modal>
    </div>
  );
};

export default UserInfoModal;
