import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type SharedState = {
  userInfoModal: boolean;
};

const initialState: SharedState = {
  userInfoModal: false,
};

export const SharedSlice = createSlice({
  name: 'SHARED',
  initialState,
  reducers: {
    toggleUserInfoModal: state => {
      state.userInfoModal = !state.userInfoModal;
    },
  },
});

export const {toggleUserInfoModal} = SharedSlice.actions;

export const selectIsUserInfoModal = (state: RootState): boolean =>
  state.SharedReducer.userInfoModal;

export default SharedSlice.reducer;
