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

const DUMMY_DATA = [
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
];

export const HomePage = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const onProgramSelect = (item: CompanyProgrammiType) => () => {
    dispatch(updateSelectProgram(item));

    // props.navigation.navigate(AppNavigatorRoots.Insert_Data);
  };

  const renderItem = (item: CompanyProgrammiType) => {
    return <ProgramItem item={item} />;
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

      <List
        size="large"
        style={{padding: '0 10px'}}
        dataSource={DUMMY_DATA}
        renderItem={renderItem}
      />
    </>
  );
};

export default HomePage;
