import React from 'react';
import './App.css';
import {Provider as StoreProvider} from 'react-redux';
import Store from '../src/store/store';
import {AppWrapper} from './pages';

function App() {
  return (
    <StoreProvider store={Store}>
      <AppWrapper />
    </StoreProvider>
  );
}

export default App;
