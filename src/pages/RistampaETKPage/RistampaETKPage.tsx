import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';
import {
  selectRistampaData,
  selectUserInfo,
} from '../../store/logic-slice/logic.slice';
import {Button, Flex, Spin, message} from 'antd';
import {Header} from '../../components';
import {IconArrowLeft, IconPrinter, IconX} from '@tabler/icons-react';
import {
  InformationOdaResponseType,
  RistampaEtkParamRequest,
} from '../../settings/controllers/types';
import {useEffect, useState} from 'react';
import styles from '../AccettazioneLaccatoPage/accettazioneLaccato.module.css';
import stylesRistampa from './ristampa.module.css';
import {
  GETRistampaETK,
  GetInformationOdaEndPoint,
} from '../../settings/api-endpoint-service';

// const DUMMY_DATA = {
//   data: {
//     odv: '1024014405',
//     posOdv: '000050',
//     dataSpedizione: '12-04-2024',
//     idPan: '1024014405_055034',
//   },
//   total: 1,
// };

export const RistampaETKPage = () => {
  const navigate = useNavigate();
  /**data from the previous page */
  const userInfo = useAppSelector(selectUserInfo);

  const [messageApi, contextHolder] = message.useMessage();

  const navigateBack = () => {
    navigate(-1);
  };

  const [etkData, setEtkData] = useState<InformationOdaResponseType | null>(
    null,
  );

  const ristampaData = useAppSelector(selectRistampaData);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadETKData, setLoadETKData] = useState<boolean>(false);

  const fetchData = async () => {
    setLoadETKData(true);

    fetch(
      `${GetInformationOdaEndPoint}?oda=${ristampaData.oda}&posOda=${ristampaData.posOda}`,
      {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setEtkData(data);
        setLoadETKData(false);
      })
      .catch(error => {
        messageApi.error('Errore durante il recupero dei dati');
        setLoadETKData(false);
      });
  };

  const onStampPress = async () => {
    setLoading(true);

    const paramReq: RistampaEtkParamRequest = {
      EtkFornitore: {
        BarcodeSymbology: 'DataMatrix',
        Raw: ristampaData.raw,
        IsManuale: ristampaData.IsManuale,
      },
    };

    fetch(GETRistampaETK, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramReq),
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        messageApi.error('Con successo');
      })
      .catch(error => {
        messageApi.error('Errore durante l`esecuzione della chiamata');
        setLoading(false);
      });

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToFirstPage = () => {
    navigate('/');
  };

  return (
    <>
      {contextHolder}
      <Header
        title="Ristampa Etk Accettazione"
        rightView={null}
        leftView={
          <IconArrowLeft stroke={2} color="#fff" onClick={navigateBack} />
        }
      />

      <Flex style={{padding: '20px'}} gap={30} vertical>
        {loadETKData ? (
          <Spin size="large" />
        ) : (
          <>
            <Flex className={styles.contentContainer}>
              <h4 className={styles.labelStyle}>Oda</h4>
              <div className={styles.inputStyle}>
                <p>{ristampaData.oda ? ristampaData.oda : ''} </p>
              </div>
            </Flex>
            <Flex className={styles.contentContainer}>
              <h4 className={styles.labelStyle}>Odv</h4>
              <div className={styles.inputStyle}>
                <p> {etkData?.data?.odv ? etkData.data.odv : ''}</p>
              </div>
            </Flex>
            <Flex className={styles.contentContainer}>
              <h4 className={styles.labelStyle}>Sped</h4>
              <div className={styles.inputStyle}>
                <p>
                  {etkData?.data?.dataSpedizione
                    ? etkData.data.dataSpedizione
                    : ''}
                </p>
              </div>
            </Flex>
            <Flex className={styles.contentContainer}>
              <h4 className={styles.labelStyle}>IdPan</h4>
              <div className={styles.inputStyle}>
                <p> {etkData?.data?.idPan ? etkData.data.idPan : ''}</p>
              </div>
            </Flex>

            <Flex className={stylesRistampa.footerContainer}>
              <Button
                onClick={navigateToFirstPage}
                icon={<IconX stroke={2} color="#fff" />}
                className={stylesRistampa.buttonStyle}
                type="primary">
                Anulla
              </Button>

              {userInfo?.data?.azienda === '30' ? (
                <Button
                  onClick={onStampPress}
                  loading={loading}
                  icon={<IconPrinter stroke={2} color="#fff" />}
                  className={stylesRistampa.buttonStyle}
                  type="primary">
                  Stampa
                </Button>
              ) : null}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default RistampaETKPage;
