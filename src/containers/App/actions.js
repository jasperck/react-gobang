import {
  UPDATE_GAME,
  UPDATE_STATUS,
  NEW_GAME,
} from './constants';

export const updateGame = play => ({
  type: UPDATE_GAME,
  payload: play,
});

export const updateStatus = status => ({
  type: UPDATE_STATUS,
  payload: status,
});

export const newGame = () => ({
  type: NEW_GAME,
});
