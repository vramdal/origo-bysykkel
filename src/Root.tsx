import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { reducer } from './Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

export const initializeStore = (): ReturnType<typeof createStore> => {
  return createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
};

export const RootComponent = (): JSX.Element => (
  <React.StrictMode>
    <Provider store={initializeStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);
