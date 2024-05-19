import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider as StoreProvider} from 'react-redux';
import Store from '../src/store/store';
import {ConfigProvider} from 'antd';
import AppWrapper from './AppWrapper';

import locale from 'antd/locale/it_IT';

import 'dayjs/locale/it-ch';
import dayjs from 'dayjs';

dayjs.locale('it-ch');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StoreProvider store={Store}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#c00518',
          },
        }}>
        <AppWrapper />
      </ConfigProvider>
    </StoreProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
