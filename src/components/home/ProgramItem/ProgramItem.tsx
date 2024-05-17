import {List} from 'antd';
import {CompanyProgrammiType} from '../../../settings/controllers/types';
import {getURL} from '../../../settings/api-endpoint-service';
import appLogo from '../../../assets/images/app_logo.png';
interface ProgramItemProps {
  item: CompanyProgrammiType;
}
export const ProgramItem: React.FC<ProgramItemProps> = ({item}) => {
  const imagePath = getURL() + item.immagine;

  return (
    <List.Item
      style={{alignItems: 'center', justifyContent: 'flex-start', gap: '20px'}}>
      <img style={{width: '80px'}} src={imagePath} alt="" />
      <p>{item?.nomeBreve ? item.nomeBreve : '-'}</p>
    </List.Item>
  );
};

export default ProgramItem;
