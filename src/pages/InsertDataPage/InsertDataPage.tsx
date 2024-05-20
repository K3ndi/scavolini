import {useNavigate} from 'react-router-dom';
import {Header} from '../../components';
import {IconArrowLeft, IconBarcode} from '@tabler/icons-react';
import {
  Checkbox,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Flex,
  Select,
  Spin,
  message,
} from 'antd';
import {
  selectInsterDataInfo,
  selectUserInfo,
  updateInsertData,
  updateSupplier,
} from '../../store/logic-slice/logic.slice';
import {useEffect, useState} from 'react';
import {SupplierResponseType} from '../../settings/controllers/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {GetSuppliersEndPoint} from '../../settings/api-endpoint-service';
import dayjs from 'dayjs';
import {
  deleteInserDataInfo,
  setInsertDataInfo,
} from '../../settings/app-service/app-storage-service';

// const DUMMY_DATA = {
//   data: [
//     {
//       codice: '0000400606',
//       ragioneSociale: 'ACOP COMPONENTS S.R.L.',
//       altkn: '400424',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400344',
//       ragioneSociale: 'ALLUMINIA SRL',
//       altkn: '400344',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400423',
//       ragioneSociale: 'ATLANTIS SRL',
//       altkn: '400423',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400592',
//       ragioneSociale: 'BECA GROUP S.R.L.',
//       altkn: '400592',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400687',
//       ragioneSociale: 'BIGIESSE SNC DI BAZZO G. & S.',
//       altkn: '400687',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400109',
//       ragioneSociale: 'DMM SPA',
//       altkn: '400105',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400782',
//       ragioneSociale: 'ERREBIELLE COMPONENTS SRL',
//       altkn: '400005',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400089',
//       ragioneSociale: 'FAB SRL',
//       altkn: '400089',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400624',
//       ragioneSociale: 'FULIGNA & SENSOLI S.R.L.',
//       altkn: '400624',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400510',
//       ragioneSociale: 'G. & D. S.P.A.',
//       altkn: '400121',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400789',
//       ragioneSociale: 'L.G. S.R.L.',
//       altkn: '400789',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400850',
//       ragioneSociale: 'LA QUERCIA - EREDI DI ROSSO SANTE',
//       altkn: '400777',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400642',
//       ragioneSociale: 'M.B.F. S.R.L.',
//       altkn: '400642',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400666',
//       ragioneSociale: 'MASETTI GLASS SAS DI MIEM SRL & C.',
//       altkn: '400009',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400049',
//       ragioneSociale: 'MEDIA PROFILI S.R.L.',
//       altkn: '400049',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400030',
//       ragioneSociale: 'ORNAMOBIL SRL',
//       altkn: '400030',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400078',
//       ragioneSociale: 'ORNATOP S.R.L.',
//       altkn: '400077',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400516',
//       ragioneSociale: 'PANTAREI SRL',
//       altkn: '400047',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400817',
//       ragioneSociale: 'PESARO GLASS S.R.L.',
//       altkn: '400009',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400633',
//       ragioneSociale: 'PRATELLI CORNICI SRL',
//       altkn: '400633',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400058',
//       ragioneSociale: 'SCILM SPA',
//       altkn: '400058',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400844',
//       ragioneSociale: 'STIVAL SRL',
//       altkn: '400037',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400020',
//       ragioneSociale: 'TERENZI VITTORIO &C.SNC DI T.S',
//       altkn: '400019',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400495',
//       ragioneSociale: 'TOP LINEA SPA',
//       altkn: '400495',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400525',
//       ragioneSociale: 'VETR. ARTIST.ARTIGIANA GLASS DI LUC',
//       altkn: '400525',
//       filtroReportUguaglianza: 0,
//     },
//     {
//       codice: '0000400009',
//       ragioneSociale: 'VETRERIA MASETTI S.R.L.',
//       altkn: '400009',
//       filtroReportUguaglianza: 0,
//     },
//   ],
//   total: 26,
// };

const getDateTransform = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return {
    day,
    month,
    year,
  };
};

export const InsertData = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const navigateBack = () => {
    navigate(-1);
    dispatch(updateInsertData({supplier: null, isInBaia: false, date: ''}));
    dispatch(updateSupplier(null));
    deleteInserDataInfo();
  };

  const dispatch = useAppDispatch();
  /**here we get the userinfo */
  const userInfo = useAppSelector(selectUserInfo);

  const insertDataInfo = useAppSelector(selectInsterDataInfo);

  const [supplierData, setSupplierData] = useState({
    data: [],
    total: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  /** dropdown state */
  const [dropdownData, setDropDownData] = useState([]);

  /**date state */
  const [selectedDate, setSelectedDate] = useState(
    insertDataInfo.date
      ? dayjs(
          `${getDateTransform(insertDataInfo.date).year}-${
            getDateTransform(insertDataInfo.date).month
          }-${getDateTransform(insertDataInfo.date).day}`,
        )
      : dayjs(),
  );

  /** baia state */
  const [checked, setChecked] = useState<boolean>(insertDataInfo.isInBaia);

  const fetchSuppliers = async () => {
    setLoading(true);

    const params = {
      matricola: userInfo?.data?.matricola
        ? Number(userInfo.data.matricola)
        : '',
      azienda: userInfo?.data?.azienda ? userInfo.data.azienda : '',
      codiceReparto: userInfo?.data?.codiceReparto
        ? userInfo.data.codiceReparto
        : '',
      nomeTerminale: 'Test',
      divisione: userInfo?.data?.divisione ? userInfo.data.divisione : '',
      isScavolini: userInfo?.data?.isScavolini
        ? userInfo.data.isScavolini
        : false,
      isErnestomeda: userInfo?.data?.isErnestomeda
        ? userInfo.data.isErnestomeda
        : false,
      isScavoliniBagni: userInfo?.data?.isScavoliniBagni
        ? userInfo.data.isScavoliniBagni
        : false,
      sorter_IsInBaia01: false,
    };

    fetch(GetSuppliersEndPoint, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(data => {
        const transformData = data.data.map((item: {ragioneSociale: any}) => {
          return {
            label: item.ragioneSociale,
            value: item.ragioneSociale,
          };
        });
        setDropDownData(transformData as any);
        if (!insertDataInfo.date) {
          dispatch(
            updateInsertData({
              ...insertDataInfo,
              date: dayjs(dayjs()).format('DD/MM/YYYY'),
            }),
          );
        }
        setSupplierData(data as any);
        setLoading(false);
      })
      .catch(error => {
        messageApi.info('Errore durante il recupero dei dati');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropDownChange = (value: string) => {
    dispatch(updateInsertData({...insertDataInfo, supplier: String(value)}));
    setInsertDataInfo({
      isInBaia: insertDataInfo.isInBaia,
      date: insertDataInfo.date
        ? insertDataInfo.date
        : dayjs(selectedDate).format('DD/MM/YYYY'),
      supplier: String(value),
    });
    const findSupplier = supplierData.data.find(
      (item: SupplierResponseType) => item.ragioneSociale === String(value),
    );
    if (findSupplier) dispatch(updateSupplier(findSupplier as any));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setSelectedDate(date);
    dispatch(
      updateInsertData({
        ...insertDataInfo,
        date: dayjs(date).format('DD/MM/YYYY'),
      }),
    );
    setInsertDataInfo({
      isInBaia: insertDataInfo.isInBaia,
      date: dayjs(date).format('DD/MM/YYYY'),
      supplier: insertDataInfo.supplier,
    });
  };

  const onChangeCheckBox: CheckboxProps['onChange'] = e => {
    setChecked(e.target.checked);
    dispatch(updateInsertData({...insertDataInfo, isInBaia: e.target.checked}));

    setInsertDataInfo({
      isInBaia: e.target.checked,
      date: insertDataInfo.date
        ? insertDataInfo.date
        : dayjs(selectedDate).format('DD/MM/YYYY'),
      supplier: insertDataInfo.supplier,
    });
  };

  const onBtnPress = () => {
    if (insertDataInfo.supplier) {
      navigate('/accetazionelaccato');
    } else {
      messageApi.info('Selezionare un fornitore');
    }
  };

  return (
    <>
      {contextHolder}
      <Header
        title="Inserisci Dati"
        rightView={<IconBarcode stroke={2} color="#fff" onClick={onBtnPress} />}
        leftView={
          <IconArrowLeft stroke={2} color="#fff" onClick={navigateBack} />
        }
      />

      <Flex style={{marginTop: 30, padding: '0 20px'}} vertical gap={30}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Flex vertical gap={5}>
              <h4>Fornitore</h4>
              <Select
                mode="tags"
                maxCount={1}
                style={{width: '100%'}}
                placeholder="seleziona un oggetto"
                value={
                  insertDataInfo?.supplier ? insertDataInfo.supplier : null
                }
                onChange={handleDropDownChange}
                options={dropdownData}
              />
            </Flex>
            <Flex vertical gap={5}>
              <h4>Data(GGMMAA)</h4>
              <DatePicker value={selectedDate} onChange={onChange} />
            </Flex>
            <Flex vertical gap={5}>
              <Checkbox checked={checked} onChange={onChangeCheckBox}>
                Sono in baia 1
              </Checkbox>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default InsertData;
