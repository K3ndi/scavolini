import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  CompanyLoginResponseType,
  CompanyProgrammiType,
  SupplierResponseType,
} from '../../settings/controllers/types';

type InsterDataType = {
  supplier: string | null;
  date: string | null;
  isInBaia: boolean;
};

export type LogicSlice = {
  userInfo: CompanyLoginResponseType | null;
  insertData: InsterDataType;
  supplier: SupplierResponseType | null;
  selectedProgram: CompanyProgrammiType | null;

  readBarCodeOnceALPage: boolean;
  triggerReadBarcodeALPage: number;
  errorReadingBarCode: boolean;

  ristampaData: {
    oda: string;
    posOda: string;
    raw: string;
    IsManuale: boolean;
  };
};

export enum AziendaCode {
  Scavolini = '10',
  Ernestomeda = '30',
}

const initialState: LogicSlice = {
  userInfo: null,
  insertData: {
    supplier: null,
    date: null,
    isInBaia: false,
  },
  selectedProgram: null,
  supplier: null,
  readBarCodeOnceALPage: false,
  triggerReadBarcodeALPage: 0,
  errorReadingBarCode: false,
  ristampaData: {
    oda: '',
    posOda: '',
    raw: '',
    IsManuale: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LogicSlice = createSlice({
  name: 'LogicSlice',
  initialState,
  reducers: {
    updateUserInfo: (
      state,
      actions: PayloadAction<CompanyLoginResponseType | null>,
    ) => {
      state.userInfo = actions.payload;
    },
    updateInsertData: (state, actions: PayloadAction<InsterDataType>) => {
      state.insertData = actions.payload;
    },
    updateSupplier: (state, action: PayloadAction<SupplierResponseType>) => {
      state.supplier = action.payload;
    },
    updateSelectProgram: (
      state,
      actions: PayloadAction<CompanyProgrammiType>,
    ) => {
      state.selectedProgram = actions.payload;
    },
    updateReadBarCodeOnce: (state, action: PayloadAction<boolean>) => {
      state.readBarCodeOnceALPage = action.payload;
    },
    triggerReadBarcode: state => {
      state.triggerReadBarcodeALPage += 1;
    },
    updateErroReadingBarCode: (state, action: PayloadAction<boolean>) => {
      state.errorReadingBarCode = action.payload;
    },
    updateRistampaData: (
      state,
      action: PayloadAction<{
        oda: string;
        posOda: string;
        raw: string;
        IsManuale: boolean;
      }>,
    ) => {
      state.ristampaData = action.payload;
    },
  },
});

export const {
  updateUserInfo,
  updateInsertData,
  updateSelectProgram,
  updateSupplier,
  updateReadBarCodeOnce,
  triggerReadBarcode,
  updateErroReadingBarCode,
  updateRistampaData,
} = LogicSlice.actions;

export const selectUserInfo = (
  state: RootState,
): CompanyLoginResponseType | null => state.LogicReducer.userInfo;

export const selectInsterDataInfo = (state: RootState): InsterDataType =>
  state.LogicReducer.insertData;

export const selectSupplier = (state: RootState): SupplierResponseType | null =>
  state.LogicReducer.supplier;

export const selectProgram = (state: RootState): CompanyProgrammiType | null =>
  state.LogicReducer.selectedProgram;

export const selectReadBarCodeOnce = (state: RootState): boolean =>
  state.LogicReducer.readBarCodeOnceALPage;

export const selectTriggerCall = (state: RootState): number =>
  state.LogicReducer.triggerReadBarcodeALPage;

export const selectErrorReadingBarcode = (state: RootState): boolean =>
  state.LogicReducer.errorReadingBarCode;

export const selectRistampaData = (
  state: RootState,
): {oda: string; posOda: string; raw: string; IsManuale: boolean} =>
  state.LogicReducer.ristampaData;

export default LogicSlice.reducer;
