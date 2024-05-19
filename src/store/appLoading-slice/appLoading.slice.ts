import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {updateInsertData, updateUserInfo} from '../logic-slice/logic.slice';
import {
  getInsertDataInfo,
  getUserInfo,
} from '../../settings/app-service/app-storage-service';

export type AppLoadingState = {
  isAppLoading: boolean;
};

const initialState: AppLoadingState = {
  isAppLoading: true,
};

export const appLoading = createAsyncThunk(
  'APP_LOADING/appLoading',

  async (_data, thunkApi) => {
    try {
      //we set the user info data
      const userInfo = getUserInfo();
      if (userInfo) thunkApi.dispatch(updateUserInfo(userInfo));

      const insertData = getInsertDataInfo();

      if (insertData) {
        thunkApi.dispatch(
          updateInsertData({
            supplier: insertData.supplier,
            isInBaia: insertData.isInBaia,
            date: insertData.date,
          }),
        );
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const AppLoadingSlice = createSlice({
  name: 'APP_LOADING',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appLoading.pending, draftState => {
      draftState.isAppLoading = true;
    });
    builder.addCase(appLoading.fulfilled, draftState => {
      draftState.isAppLoading = false;
    });
    builder.addCase(appLoading.rejected, draftState => {
      draftState.isAppLoading = false;
    });
  },
});

export const selectIsAppLoading = (state: RootState): boolean =>
  state.AppLoadingReducer.isAppLoading;

export default AppLoadingSlice.reducer;
