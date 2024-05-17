import {Flex, Modal} from 'antd';
import {CompanyLoginResponseType} from '../../../settings/controllers/types';

interface UserInfoModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;

  userInfo: CompanyLoginResponseType | null;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({
  open,
  onCancel,
  onOk,
  userInfo,
}) => {
  return (
    <div>
      <Modal
        title="Informazioni"
        cancelText="Annulla"
        okText="Ok"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={(_, {OkBtn}) => (
          <>
            <OkBtn />
          </>
        )}>
        <Flex gap={10}>
          <h4>Utente:</h4>
          <h4>
            {userInfo?.data?.nomeCognome ? userInfo.data.nomeCognome : '-'}
          </h4>
        </Flex>
        <Flex gap={10}>
          <h4>Reparto:</h4>
          <h4>
            {userInfo?.data?.nomeReparto ? userInfo.data.nomeReparto : '-'}
            {userInfo?.data?.codiceReparto
              ? `(${userInfo.data.codiceReparto})`
              : null}
          </h4>
        </Flex>
        <Flex gap={10}>
          <h4>Versione:</h4>
          <h4>1</h4>
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
