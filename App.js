/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import MainNavigator from './navigation/MainNavigator';
import walletReducer from './store/walletReducer';
import { init } from './db/walletDB';







init()
  .then((result) => {
    console.log('DATABASE CREATED!');
  })
  .catch((err) => {
    console.log('FALID TO CREATE DATABASE');
  });

const store = createStore(walletReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
