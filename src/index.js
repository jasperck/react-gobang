import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * Import root app
 */
import App from './containers/App';

/**
 * Import global Styles
 */
import './global-styles';

/**
 * Import store
 */
import configureStore from './store';

/**
 * Configure store
 */
const initialState = {};
const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
