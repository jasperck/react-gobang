import {
  UPDATE_GAME,
  UPDATE_STATUS,
} from './constants';

export const updateGame = play => ({
  type: UPDATE_GAME,
  payload: play,
});

export const updateStatus = status => ({
  type: UPDATE_STATUS,
  payload: status,
});
