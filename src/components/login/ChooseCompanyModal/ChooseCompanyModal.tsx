import {Button, Modal, Radio, RadioChangeEvent, Space} from 'antd';
import {useState} from 'react';

interface ChooseCompanyModalProps {
  open: boolean;
  onOk: (companyCode: '10' | '30' | null) => void;
  onCancel: () => void;
  loading: boolean;
}

export const ChooseCompanyModal: React.FC<ChooseCompanyModalProps> = ({
  open,
  onCancel,
  onOk,
  loading,
}) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onSelectPress = () => {
    onOk(value === 1 ? '10' : value === 2 ? '30' : null);
  };

  return (
    <div>
      <Modal
        title="Scegli Azienda"
        open={open}
        onOk={onSelectPress}
        closeIcon={null}
        confirmLoading={loading}
        okText="Scegli"
        footer={(_, {OkBtn}) => (
          <>
            <Button onClick={onCancel} disabled={loading}>
              Annulla
            </Button>
            <OkBtn />
          </>
        )}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Scavolini</Radio>
            <Radio value={2}>Ernestomeda</Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default ChooseCompanyModal;
