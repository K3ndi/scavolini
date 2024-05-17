import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {updateUserInfo} from '../logic-slice/logic.slice';
import {getUserInfo} from '../../settings/app-service/app-storage-service';

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

      thunkApi.dispatch(updateUserInfo(userInfo));
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
