import React from 'react';
import {Header, ProgramItem} from '../../components';
import {IconArrowLeft} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  selectUserInfo,
  updateSelectProgram,
} from '../../store/logic-slice/logic.slice';
import {CompanyProgrammiType} from '../../settings/controllers/types';
import {List} from 'antd';

export const HomePage = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const onProgramSelect = (item: CompanyProgrammiType) => () => {
    dispatch(updateSelectProgram(item));
    navigate('/insertdata');
  };

  const renderItem = (item: CompanyProgrammiType) => {
    return <ProgramItem onProgramSelect={onProgramSelect} item={item} />;
  };

  return (
    <>
      <Header
        title="Elenco Programmi"
        rightView={null}
        leftView={
          <IconArrowLeft stroke={2} color="#fff" onClick={navigateBack} />
        }
      />

      {userInfo?.data?.programmi ? (
        <List
          size="large"
          style={{padding: '10px 10px'}}
          dataSource={userInfo.data.programmi}
          renderItem={renderItem}
        />
      ) : (
        <h3 style={{marginTop: '30px'}}>Nessuna informazione</h3>
      )}
    </>
  );
};

export default HomePage;
