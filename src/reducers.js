import { combineReducers } from 'redux-immutable';
import AppReducer from '@/containers/App/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    /**
     * load reducer here
     */
    app: AppReducer,
    ...asyncReducers,
  });
}
