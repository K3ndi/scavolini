import {IconApps} from '@tabler/icons-react';
import {Button, Flex} from 'antd';
import styles from './userinfo.module.css';
interface UserInfoLoginProps {
  fullName: string;
  repartName: string;
  navigateHome: () => void;
}

export const UserInfoData: React.FC<UserInfoLoginProps> = ({
  fullName,
  repartName,
  navigateHome,
}) => {
  return (
    <Flex vertical gap={15}>
      <Flex gap={5}>
        <h4>Utente:</h4>
        <h4>{fullName ? fullName : '-'}</h4>
      </Flex>

      <Flex gap={5}>
        <h4>Reparto:</h4>
        <h4>{repartName ? repartName : '-'}</h4>
      </Flex>

      <Button className={styles.btnStyle} type="primary" onClick={navigateHome}>
        <IconApps />
        Apps
      </Button>
    </Flex>
  );
};

export default UserInfoData;
