import {configureStore} from '@reduxjs/toolkit';
import AppLoadingReducer from './appLoading-slice/appLoading.slice';
import SharedReducer from './shared-slice/shared.slice';
import LogicReducer from './logic-slice/logic.slice';

export const store = configureStore({
  reducer: {
    AppLoadingReducer,
    SharedReducer,
    LogicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
