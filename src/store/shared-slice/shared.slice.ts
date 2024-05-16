import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type SharedState = {
  userInfoModal: boolean;
  acBarCodeModal: boolean;
};

const initialState: SharedState = {
  userInfoModal: false,
  acBarCodeModal: false,
};

export const SharedSlice = createSlice({
  name: 'SHARED',
  initialState,
  reducers: {
    toggleUserInfoModal: state => {
      state.userInfoModal = !state.userInfoModal;
    },
    toggleACBarCodeModal: state => {
      state.acBarCodeModal = !state.acBarCodeModal;
    },
  },
});

export const {toggleUserInfoModal, toggleACBarCodeModal} = SharedSlice.actions;

export const selectIsUserInfoModal = (state: RootState): boolean =>
  state.SharedReducer.userInfoModal;

export const selectACBarCodeModal = (state: RootState): boolean =>
  state.SharedReducer.acBarCodeModal;

export default SharedSlice.reducer;
