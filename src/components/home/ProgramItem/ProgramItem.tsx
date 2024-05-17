import {List} from 'antd';
import {CompanyProgrammiType} from '../../../settings/controllers/types';
import {getURL} from '../../../settings/api-endpoint-service';
interface ProgramItemProps {
  item: CompanyProgrammiType;
  onProgramSelect: (item: CompanyProgrammiType) => () => void;
}
export const ProgramItem: React.FC<ProgramItemProps> = ({
  item,
  onProgramSelect,
}) => {
  const imagePath = getURL() + item.immagine;
  console.log('Test', imagePath);
  return (
    <List.Item
      onClick={onProgramSelect(item)}
      style={{alignItems: 'center', justifyContent: 'flex-start', gap: '20px'}}>
      <img style={{width: '80px'}} src={imagePath} alt="" />
      <p>{item?.nomeBreve ? item.nomeBreve : '-'}</p>
    </List.Item>
  );
};

export default ProgramItem;
