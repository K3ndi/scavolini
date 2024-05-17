import {
  ChooseCompanyModal,
  Header,
  UserInfoData,
  UserInfoModal,
} from '../../components';
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
import {useNavigate} from 'react-router-dom';
import {
  deleteUserInfo,
  setUserInfo,
} from '../../settings/app-service/app-storage-service';

const DUMMY_DATA = {
  data: {
    programmi: [
      {
        codice: 'CTL-ACC-01     ',
        immagine: '/Immagini/Programmi/accettazionemerce.png',
        nomeBreve: 'Accett. Merce Lacc.',
        isMenuSap: false,
        id: 'AccMerce',
      },
      {
        codice: 'UGU-PRE',
        immagine: '/Immagini/Programmi/uguaglianza2d.png',
        nomeBreve: 'Uguaglianza 2D',
        isMenuSap: false,
        id: 'Uguaglianza2D',
      },
      {
        codice: 'CTL-SOR-01',
        immagine: '/Immagini/Programmi/uguaglianza2d.png',
        nomeBreve: 'Uguaglianza Srt',
        isMenuSap: false,
        id: 'UguaglianzaSorter',
      },
      {
        codice: 'STM-ETK-02',
        immagine: '/Immagini/Programmi/stampa.png',
        nomeBreve: 'Genera Etichetta',
        isMenuSap: false,
        id: 'StampaEtichetteSped',
      },
      {
        codice: 'MAN',
        immagine: '/Immagini/Programmi/mancanti.png',
        nomeBreve: 'Segn. Mancanti',
        isMenuSap: false,
        id: 'Mancanti',
      },
      {
        codice: 'CTL-SMT-01',
        immagine: '/Immagini/Programmi/prelievoante.png',
        nomeBreve: 'Smistamento',
        isMenuSap: false,
        id: 'SmistLaccato',
      },
      {
        codice: 'STM-ETK-05',
        immagine: '/Immagini/Programmi/stampa.png',
        nomeBreve: 'Stampa Etk Carrello',
        isMenuSap: false,
        id: 'StampaEtkCarrello',
      },
    ],
    matricola: 920,
    nomeCognome: 'ROBERTO GIANGOLINI',
    isDimesso: false,
    codiceReparto: '45',
    nomeReparto: 'Magazzino e foratura ante',
    divisione: '100',
    azienda: '10',
    isScavolini: true,
    isErnestomeda: false,
    isScavoliniBagni: false,
    isLaccatoScavolini: false,
    isRepartoImballoAnte: false,
    isLaccatoErnestomeda: false,
    isFuoriMisuraErnestomeda: false,
    isScSpedizioniIta: false,
    isScSpedizioniEst: false,
    isRepartoTopMensole: false,
    isSpedizioniScavolini: false,
    isScCapoArea: false,
    isEldomScavolini: false,
    isMagRiordinatoreAnteScavolini: true,
    isMagazzinoErnestomeda: false,
    isFmLotto1Ernestomeda: false,
    getInfoBase: 'ROBERTO GIANGOLINI (Magazzino e foratura ante 45)',
  },
  total: 1,
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  /**here we get the userinfo */
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  /**input value state */
  const [matricolaInput, setMatricolaInput] = useState<string>(
    userInfo?.data?.matricola ? String(userInfo.data.matricola) : '',
  );

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

      // const loginData = await companyLogin(companyCode, matricolaInput);
      // if (!loginData.success) {
      //   throw new Error();
      // }
      dispatch(updateUserInfo(DUMMY_DATA as CompanyLoginResponseType));
      setUserInfo(DUMMY_DATA as CompanyLoginResponseType);
      setLoading(false);
      toggleSelectCompanyModal();
    } catch (error) {
      messageApi.info('Errore durante il recupero dei dati');
      setLoading(false);
      toggleSelectCompanyModal();
    }
  };

  const selectCompany = (companyCode: '10' | '30' | null) => {
    fetchAziendaData(companyCode);
  };

  const changeCompany = () => {
    setMatricolaInput('');
    dispatch(updateUserInfo(null));
    deleteUserInfo();
  };

  const onAccediPress = () => {
    if (matricolaInput) {
      toggleSelectCompanyModal();
    } else {
      messageApi.info('Scrivere la matricola');
    }
  };

  const navigateHome = () => {
    navigate('programmi');
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

        {userInfo ? (
          <UserInfoData
            fullName={userInfo?.data?.nomeCognome}
            repartName={userInfo?.data?.nomeReparto}
            navigateHome={navigateHome}
          />
        ) : null}

        {userInfoModal ? (
          <UserInfoModal
            onCancel={toggleUserInfo}
            onOk={toggleUserInfo}
            open={userInfoModal}
            userInfo={userInfo}
          />
        ) : null}

        {selectCompanyModal ? (
          <ChooseCompanyModal
            loading={loading}
            open={selectCompanyModal}
            onCancel={toggleSelectCompanyModal}
            onOk={selectCompany}
          />
        ) : null}
      </section>
    </>
  );
};

export default LoginPage;
