import { createStore, compose } from 'redux';
import Immutable, { fromJS } from 'immutable';
import createReducer from './reducers';

export default function configureStore(initialState) {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  /* istanbul ignore next */
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production'
      && typeof window === 'object'
      && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          serialize: {
            immutable: Immutable, // to enable immutable.js serialization
          },
          autoPause: true, // pause when the extension window is not opened
        })
        : compose);
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(),
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
};
