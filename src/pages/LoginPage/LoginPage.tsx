import {ChooseCompanyModal, Header, UserInfoModal} from '../../components';
import {
  IconInfoCircle,
  IconUser,
  IconUserCode,
  IconX,
} from '@tabler/icons-react';
import styles from './login.module.css';
import logoApp from '../../assets/images/Scavolini.jpg';
import {Flex, Input, message} from 'antd';
import {Button} from 'antd';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  selectUserInfo,
  updateUserInfo,
} from '../../store/logic-slice/logic.slice';
import {useState} from 'react';

import {companyLogin} from '../../settings/controllers/app-controllers';
import {CompanyLoginResponseType} from '../../settings/controllers/types';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  /**here we get the userinfo */
  const userInfo = useAppSelector(selectUserInfo);

  const [messageApi, contextHolder] = message.useMessage();

  /**input value state */
  const [matricolaInput, setMatricolaInput] = useState<string>(
    userInfo?.data?.matricola ? String(userInfo.data.matricola) : '',
  );
  console.log('🚀 ~ LoginPage ~ matricolaInput:', matricolaInput);

  const [loading, setLoading] = useState<boolean>(false);

  /**select company state modal */
  const [selectCompanyModal, setSelectCompanyModal] = useState<boolean>(false);
  const toggleSelectCompanyModal = () => setSelectCompanyModal(prev => !prev);

  /**user info state modal */
  const [userInfoModal, setUserInfoModal] = useState(false);

  const toggleUserInfo = () => {
    setUserInfoModal(prev => !prev);
  };

  const onInputChange = (e: any) => {
    setMatricolaInput(e.target.value);
  };

  const fetchAziendaData = async (companyCode: '10' | '30' | null) => {
    try {
      setLoading(true);

      const loginData = await companyLogin(companyCode, matricolaInput);
      if (!loginData.success) {
        throw new Error();
      }
      dispatch(updateUserInfo(loginData.result as CompanyLoginResponseType));
      // setUserInfo(loginData.result as CompanyLoginResponseType);
      setLoading(false);
    } catch (error) {
      // Toast.show({
      //   type: 'error',
      //   text2: 'Errore durante il recupero dei dati',
      // });
      setLoading(false);
      console.log(error);
    }
  };

  const selectCompany = (companyCode: '10' | '30' | null) => {
    toggleSelectCompanyModal();
    fetchAziendaData(companyCode);
  };

  const changeCompany = () => {
    setMatricolaInput('');
    dispatch(updateUserInfo(null));
  };

  const onAccediPress = () => {
    if (matricolaInput) {
      toggleSelectCompanyModal();
    } else {
      messageApi.info('Scrivere la matricola');
    }
  };

  return (
    <>
      {contextHolder}
      <Header
        title="Autenticazione"
        rightView={
          <IconInfoCircle stroke={2} color="#fff" onClick={toggleUserInfo} />
        }
        leftView={<IconX stroke={2} color="#fff" />}
      />
      <section className={styles.container}>
        <img src={logoApp} alt="app logo" />

        <h2>Matricola</h2>

        <Input.Password
          className={styles.inputStyle}
          placeholder="matricola..."
          value={matricolaInput}
          onChange={onInputChange}
        />

        <Flex gap={30}>
          <Button
            onClick={onAccediPress}
            style={{backgroundColor: '#c00518', color: '#fff'}}
            className={styles.buttonStyle}>
            <IconUser />
            Accedi
          </Button>
          <Button
            onClick={changeCompany}
            style={{backgroundColor: '#c00518', color: '#fff'}}
            className={styles.buttonStyle}>
            <IconUserCode />
            Cambia
          </Button>
        </Flex>

        {userInfoModal ? (
          <UserInfoModal
            onCancel={toggleUserInfo}
            onOk={toggleUserInfo}
            open={userInfoModal}
          />
        ) : null}

        {selectCompanyModal ? (
          <ChooseCompanyModal
            open={selectCompanyModal}
            onCancel={toggleSelectCompanyModal}
            onOk={() => console.log('dsfdf')}
          />
        ) : null}
      </section>
    </>
  );
};

export default LoginPage;
