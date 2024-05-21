import React, {useEffect, useState} from 'react';
import {Header} from '../../components';
import {IconArrowLeft, IconCircleMinus, IconPrinter} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';
import {Button, Flex, message} from 'antd';
import styles from './accettazioneLaccato.module.css';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  selectErrorReadingBarcode,
  selectInsterDataInfo,
  selectProgram,
  selectReadBarCodeOnce,
  selectRistampaData,
  selectSupplier,
  selectTriggerCall,
  selectUserInfo,
  triggerReadBarcode,
  updateErroReadingBarCode,
  updateReadBarCodeOnce,
  updateRistampaData,
} from '../../store/logic-slice/logic.slice';

import {VerifySupplierResponseType} from '../../settings/controllers/types';
import {
  GetReadBarCodeEndPoint,
  GetVerifySupplierEndPoint,
} from '../../settings/api-endpoint-service';
// const DUMMY_DATA_VERIFY = {
//   data: {
//     isErrore: false,
//     noTranscodifica: false,
//     messaggio: '',
//     codiceArticolo: '20375504',
//     dataCorretta: null,
//     zona: null,
//     etichettaCampioneColore: null,
//     segnalazioneNoteArticolo: null,
//     descrizione: 'FR.BASE 60 H73 C/MONT.CENT.FAV.LOP-ATL-',
//     isEtichettaCampioneColore: false,
//     isSegnalazioneNoteArticolo: false,
//     odv: '1024014405',
//     posOdv: '000050',
//     cliente: null,
//     isEstero: false,
//     posizioneInMagazzino: null,
//     riferimento: null,
//     isErroreData: false,
//     tipoOrdine: 'ZLAC',
//     umDispobili: null,
//     qtaLetta: 0,
//     um: null,
//     isUmLineare: false,
//     isStampaEtk: false,
//     nomeSorter: '',
//     dataConsegna: '2024-03-20T00:00:00',
//     colore: 'Beige Ral1013',
//     finitura: 'Opaco',
//     dimensioni: '728x597x25',
//     sensoVena: 'N',
//     isDentroSorter: true,
//     dataProduzione: '12-04-2024',
//     idPan: null,
//     idTask: null,
//     idTaskSequenza: null,
//     numeroSlot: '',
//     idCarrello: '',
//     progressivo: null,
//   },
//   total: 1,
// };

// const DUMMY_DATA_BARODE = {
//   data: {
//     nomeLista: '',
//     desmosIdx: '0',
//     codiceCollo: '00000000000000000000',
//     posizione: '000000',
//     codArticolo: '20375504',
//     codColore: 'C00018',
//     codFinitura: '00002',
//     he: '728',
//     heFloat: 728,
//     le: '597',
//     leFloat: 597,
//     oda: '5524010597',
//     posOda: '00300',
//     tipoEtichetta: 1,
//     odv: '0000000000',
//     partNumber: null,
//     plnum: null,
//     vornr: null,
//     isManuale: false,
//     idPan: null,
//     isEtichettaNonDefinita: false,
//     isEtichettaFornitore: true,
//     isEtichettaProduzione: false,
//     isEtichettaProduzioneManuale: false,
//     isPreEtichettaEldom: false,
//     isEtichettaDelGrezzo: false,
//     isEtichettaVersamtoProduzione: false,
//     isEtichettaPartNumber: false,
//     isEtichettaCollo: false,
//     isEtichettaColloPosizione: false,
//     isMTO: false,
//     isETK: false,
//     isTAV: false,
//     hasOda: true,
//     hasNomeLista: false,
//     hasIdx: false,
//     sezionaA0: '20375504;C00018;00002;728;597',
//     sezionaA1: '5524010597;00300',
//     sezionaA2: '20375504',
//     seziona01: ';0;00000000000000000000',
//     seziona02: '20375504;C00018;00002;728;597',
//     seziona03: '20375504',
//     seziona04: '20375504;0',
//     seziona05: ';',
//     hasIdPan: false,
//   },
//   total: 1,
// };

export const AccettazioneLaccatoPage = () => {
  const navigate = useNavigate();
  /**data from the previous page */
  const insertData = useAppSelector(selectInsterDataInfo);
  const errorScann = useAppSelector(selectErrorReadingBarcode);

  const [messageApi, contextHolder] = message.useMessage();

  const navigateBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState<boolean>(false);

  const [verifiedData, setVerifiedData] =
    useState<VerifySupplierResponseType | null>(null);

  const readBarCodeOnce = useAppSelector(selectReadBarCodeOnce);
  const ristampaData = useAppSelector(selectRistampaData);

  const [barCodeText, setBarCodeText] = useState('');

  const [errorData, setErrorData] = useState({visible: false, message: ''});

  const [letturaDiResso, setLetturaDiReso] = useState(false);

  const triggerReadBarCode = useAppSelector(selectTriggerCall);

  /**user data */
  const userInfoData = useAppSelector(selectUserInfo);

  /**specific data of the selected supplier */
  const selectedSupplierData = useAppSelector(selectSupplier);

  /**selected program data */
  const selectedProgram = useAppSelector(selectProgram);

  const dispatch = useAppDispatch();

  const fetchBarCodeData = async (text: string) => {
    setLoading(true);

    fetch(
      `${GetReadBarCodeEndPoint}?symb=DataMatrix&raw=${text}&isManuale=${false}&idTerminale=TEST`,
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
        const verifyParamReq = {
          InfoUtente: {
            Matricola: userInfoData?.data?.matricola
              ? Number(userInfoData.data.matricola)
              : null,
            Azienda: userInfoData?.data?.azienda
              ? userInfoData.data.azienda
              : null,
            CodiceReparto: userInfoData?.data?.codiceReparto
              ? userInfoData.data.codiceReparto
              : null,
            NomeTerminale: 'Test',
            Divisione: userInfoData?.data?.divisione
              ? userInfoData.data.divisione
              : null,
            IsScavolini: userInfoData?.data?.isScavolini
              ? userInfoData.data.isScavolini
              : null,
            IsErnestomeda: userInfoData?.data?.isErnestomeda
              ? userInfoData.data.isErnestomeda
              : null,
            IsScavoliniBagni: userInfoData?.data?.isScavoliniBagni
              ? userInfoData.data.isScavoliniBagni
              : null,
            Sorter_IsInBaia01: true,
          },
          ProgrammaUsato: {
            Id: selectedProgram?.id ? selectedProgram.id : null,
            Codice: selectedProgram?.codice ? selectedProgram.codice : null,
          },
          EtichetteLette: {
            EtkFornitore: {
              BarcodeSymbology: 'DataMatrix',
              Raw: text,
              IsManuale: data?.data.isManuale,
            },
            EtkProduzione: {
              BarcodeSymbology: '',
              Raw: '',
              IsManuale: data?.data.isManuale,
            },
            EtkProduzione2: {
              BarcodeSymbology: '',
              Raw: '',
              IsManuale: data?.data.isManuale,
            },
            IsLetturaDiReso: letturaDiResso,
          },
          InfoFornitore: {
            Altkn: selectedSupplierData?.altkn,
            Lifnr: selectedSupplierData?.codice,
            RagioneSociale: insertData?.supplier,
            DataConsegna: insertData.date,
            IdDocumento: 0,
            DDTs: [],
          },
          DatiProduzione: {
            DataSpedizione: '0001-01-01T00:00:00',
            DataProduzione: '0001-01-01T00:00:00',
            Zone: [],
            IdFamigliaCatasta: 0,
            IdCatasta: 0,
          },
          DatiSegnalazioneMancante: {
            TipoSegnalazione: 0,
            CausaleM: {
              Id: '',
              Descrizione: '',
            },
            CausaleN: {
              Id: '',
              Descrizione: '',
            },
            CausaleO: {
              Id: '',
              Descrizione: '',
            },
          },
          DatiSap: {
            QtaInserita: 0.0,
            Um: '',
            Articolo: '',
            Descrizione: '',
            Segno: '',
            CodiceScaffale: '',
            DataRegistazione: '0001-01-01T00:00:00',
            CentroDiCosto: '',
          },
          DatiStampaEtk: null,
        };

        fetch(GetVerifySupplierEndPoint, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifyParamReq),
        })
          .then(res => res.json())
          .then(dataVerify => {
            if (dataVerify?.data.isErrore) {
              setErrorData({
                visible: true,
                message: dataVerify.data.messaggio,
              });
              dispatch(updateErroReadingBarCode(true));
            } else {
              setVerifiedData(dataVerify as any);
              dispatch(
                updateRistampaData({
                  oda: data?.data.oda as any,
                  posOda: data?.data.posOda as any,
                  raw: text,
                  IsManuale: data?.data.isManuale as any,
                }),
              );

              dispatch(updateReadBarCodeOnce(true));
            }

            dispatch(updateReadBarCodeOnce(true));
            setLoading(false);
          })
          .catch(error => {
            messageApi.error('Errore durante il recupero dei dati');
            setLoading(false);
          });
      })
      .catch(error => {
        messageApi.error('Errore durante il recupero dei dati');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (readBarCodeOnce && barCodeText) {
      fetchBarCodeData(barCodeText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReadBarCode, barCodeText]);

  const onErrorReset = () => {
    setVerifiedData(null);
    dispatch(updateReadBarCodeOnce(false));
    dispatch(updateErroReadingBarCode(false));
    dispatch(
      updateRistampaData({oda: '', posOda: '', raw: '', IsManuale: false}),
    );
    setBarCodeText('');
    setErrorData({visible: false, message: ''});
  };

  const navigateToRistampaEtk = () => {
    if (ristampaData.oda && ristampaData.posOda) {
      navigate('/ristampaetk');
    } else {
      messageApi.info('Leggere il codice a barre');
    }
  };

  const toggleScannAgain = () => {
    if (errorScann) {
      messageApi.error("Resettare l'errore");
    } else {
      if (readBarCodeOnce) {
        setLetturaDiReso(prev => !prev);
        dispatch(triggerReadBarcode());
      }
    }
  };

  const handleKeyDown = (event: any) => {
    // Check if the "Enter" key is pressed
    if (event.key === 'Enter') {
      const scannedBarcode = event.target.value.trim();
      if (scannedBarcode) {
        setBarCodeText(scannedBarcode);
        // You can perform further processing with the scanned barcode value here
      }
      // Clear the input field after processing
      event.target.value = '';
    }
  };

  return (
    <Flex>
      {contextHolder}
      <Header
        title="Accettazione Laccato"
        rightView={
          <Flex gap={20}>
            <IconPrinter
              onClick={navigateToRistampaEtk}
              stroke={2}
              color="#fff"
            />
            <IconCircleMinus
              onClick={toggleScannAgain}
              stroke={2}
              color="#fff"
            />
          </Flex>
        }
        leftView={
          <IconArrowLeft stroke={2} color="#fff" onClick={navigateBack} />
        }
      />

      <Flex style={{padding: '20px'}} gap={30} vertical>
        {loading ? <h3>Scansione DataMatrix...</h3> : null}

        <input
          type="text"
          placeholder="Scan barcode..."
          style={{zIndex: -999, position: 'absolute', visibility: 'hidden'}}
          onKeyDown={handleKeyDown}
        />

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Fornitore</h4>
          <div className={styles.inputStyle}>
            <p>{insertData?.supplier ? insertData.supplier : ''} </p>
          </div>
        </Flex>

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Date</h4>
          <div className={styles.inputStyle}>
            <p>{insertData?.date ? insertData?.date : ''}</p>
          </div>
        </Flex>

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Prod.</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.dataProduzione
                ? verifiedData.data.dataProduzione
                : ''}
            </p>
          </div>
        </Flex>

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Articolo</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.codiceArticolo
                ? verifiedData.data.codiceArticolo
                : ''}
            </p>
          </div>
        </Flex>
        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Colore</h4>
          <div className={styles.inputStyle}>
            <p>{verifiedData?.data?.colore ? verifiedData.data.colore : ''}</p>
          </div>
        </Flex>

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Fin.</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.finitura ? verifiedData.data.finitura : ''}
            </p>
          </div>
        </Flex>

        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Dim.</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.dimensioni
                ? verifiedData.data.dimensioni
                : ''}
            </p>
          </div>
        </Flex>
        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Sen. V.</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.sensoVena ? verifiedData.data.sensoVena : ''}
            </p>
          </div>
        </Flex>
        <Flex className={styles.contentContainer}>
          <h4 className={styles.labelStyle}>Sorter</h4>
          <div className={styles.inputStyle}>
            <p>
              {verifiedData?.data?.nomeSorter
                ? verifiedData.data.nomeSorter
                : ''}
            </p>
          </div>
        </Flex>

        {verifiedData?.data?.descrizione ? (
          <Flex vertical>
            <h4 className={styles.infoLabel}>
              {verifiedData?.data?.descrizione}
            </h4>
          </Flex>
        ) : null}

        {errorData.visible ? (
          <Flex vertical gap={10}>
            <h4 className={styles.infoLabel}>{errorData.message}</h4>
            <Button type="primary" onClick={onErrorReset}>
              RESET ERRORE
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};
export default AccettazioneLaccatoPage;
