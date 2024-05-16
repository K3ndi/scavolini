import {Modal, Radio, RadioChangeEvent, Space} from 'antd';
import {useState} from 'react';

interface ChooseCompanyModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const ChooseCompanyModal: React.FC<ChooseCompanyModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Modal title="Scegli Azienda" open={open} onOk={onOk} onCancel={onCancel}>
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
