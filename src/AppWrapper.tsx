import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {
  appLoading,
  selectIsAppLoading,
} from './store/appLoading-slice/appLoading.slice';
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/app-routes';

export const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectIsAppLoading);

  useEffect(() => {
    (async function () {
      dispatch(appLoading());
    })();
  }, [dispatch]);

  if (isAppLoading) {
    return null;
  }

  return <RouterProvider router={router} />;
};

export default AppWrapper;
