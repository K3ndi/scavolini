import {Flex, List} from 'antd';
import {CompanyProgrammiType} from '../../../settings/controllers/types';
import {getURL} from '../../../settings/api-endpoint-service';
import noImagePng from '../../../assets/images/noImage.png';
import styles from './programitem.module.css';

interface ProgramItemProps {
  item: CompanyProgrammiType;
  onProgramSelect: (item: CompanyProgrammiType) => () => void;
}
export const ProgramItem: React.FC<ProgramItemProps> = ({
  item,
  onProgramSelect,
}) => {
  const imagePath = getURL() + item.immagine;

  return (
    <List.Item
      title="testt"
      className={styles.listItem}
      onClick={onProgramSelect(item)}>
      <Flex>
        <img
          className={styles.imageStyle}
          src={imagePath}
          alt=""
          onError={({currentTarget}) => {
            currentTarget.onerror = null;
            currentTarget.src = noImagePng;
          }}
        />
      </Flex>
      <Flex>
        <p>{item?.nomeBreve ? item.nomeBreve : '-'}</p>
      </Flex>
    </List.Item>
  );
};

export default ProgramItem;
