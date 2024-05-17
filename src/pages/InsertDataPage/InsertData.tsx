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
import {SupplierResponse} from '../../settings/controllers/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {format} from 'date-fns';
import {GetSuppliersEndPoint} from '../../settings/api-endpoint-service';

export const InsertData = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const navigateBack = () => {
    navigate(-1);
  };

  const dispatch = useAppDispatch();
  /**here we get the userinfo */
  const userInfo = useAppSelector(selectUserInfo);

  const insertDataInfo = useAppSelector(selectInsterDataInfo);

  const [supplierData, setSupplierData] = useState<SupplierResponse>({
    date: [],
    total: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  /** dropdown state */
  const [valueDropDown, setValueDropDown] = useState(null);
  const [dropdownData, setDropDownData] = useState([]);

  /**date state */
  const [selectedDate, setSelectedDate] = useState(new Date());

  /** baia state */
  const [checked, setChecked] = useState<boolean>(false);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const params = {
        matricola: userInfo?.data?.matricola ? userInfo.data.matricola : null,
        azienda: userInfo?.data?.azienda ? userInfo.data.azienda : null,
        codiceReparto: userInfo?.data?.codiceReparto
          ? userInfo.data.codiceReparto
          : null,
        nomeTerminale: 'Test',
        divisione: userInfo?.data?.divisione ? userInfo.data.divisione : null,
        isScavolini: userInfo?.data?.isScavolini
          ? userInfo.data.isScavolini
          : null,
        isErnestomeda: userInfo?.data?.isErnestomeda
          ? userInfo.data.isErnestomeda
          : null,
        isScavoliniBagni: userInfo?.data?.isScavoliniBagni
          ? userInfo.data.isScavoliniBagni
          : null,
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
          const transformData = data.result?.date.map(
            (item: {ragioneSociale: any}) => {
              return {
                label: item.ragioneSociale,
                value: item.ragioneSociale,
              };
            },
          );
          setDropDownData(transformData as any);
          setSupplierData(data as SupplierResponse);
          dispatch(
            updateInsertData({
              ...insertDataInfo,
              date: format(new Date(), 'dd-MM-yyyy'),
            }),
          );
          setLoading(false);
        })
        .catch(error => {
          messageApi.info('Errore durante il recupero dei dati');
          setLoading(false);
        });
    } catch (error) {
      messageApi.info('Errore durante il recupero dei dati');

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();

    return () => {
      dispatch(updateInsertData({supplier: null, isInBaia: false, date: null}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);

    dispatch(updateInsertData({...insertDataInfo, supplier: value}));

    const findSupplier = supplierData.date.find(
      (item: {ragioneSociale: any}) => item.ragioneSociale === value,
    );
    dispatch(updateSupplier(findSupplier as any));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDate(dateString as any);
    dispatch(updateInsertData({...insertDataInfo, date: dateString as any}));
  };

  const onChangeCheckBox: CheckboxProps['onChange'] = e => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
    dispatch(updateInsertData({...insertDataInfo, isInBaia: e.target.checked}));
  };

  return (
    <>
      {contextHolder}

      <Header
        title="Inserisci Dati"
        rightView={<IconBarcode stroke={2} color="#fff" />}
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
                style={{width: '100%'}}
                placeholder="seleziona un oggetto"
                onChange={handleChange}
                options={dropdownData}
              />
            </Flex>
            <Flex vertical gap={5}>
              <h4>Data(GGMMAA)</h4>
              <DatePicker onChange={onChange} />
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
