import { fromJS } from 'immutable';
import { BOARD_SIZE } from '@/constants';
import {
  UPDATE_GAME,
  UPDATE_STATUS,
  EMPTY,
  BLACK,
  WHITE,
  GAME_STATUS_STOP,
  NEW_GAME,
} from './constants';

const initialState = fromJS({
  board: initialListArray(),
  currentRole: BLACK,
  gameStatus: GAME_STATUS_STOP,
});

function initialListArray() {
  let listArray = [];
  for (let i = 0; i <= BOARD_SIZE; i++) {
    let subList = [];
    for (var j = 0; j <= BOARD_SIZE; j++) {
      subList.push(fromJS({
        x: 0,
        y: 0,
        role: EMPTY,
      }));
    }
    listArray.push(subList);
  }

  return listArray;
}

function changeRole(currentRole) {
  return currentRole === BLACK ? WHITE : BLACK;
}

const AppReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NEW_GAME:
      return state
        .set('board', initialState.get('board'))
        .set('currentRole', initialState.get('currentRole'))
        .set('gameStatus', initialState.get('gameStatus'));
    case UPDATE_GAME:
      const { cell, ...newPiece } = payload;

      /**
       * drop piece on cell already with piece placed
       */
      if (state.getIn(['board', ...cell, 'role']) !== EMPTY) {
        return state;
      }

      return state
        .updateIn(['board', ...cell], piece => (fromJS({ ...newPiece })))
        .set('currentRole', changeRole(newPiece.role));
    case UPDATE_STATUS:
      return state
        .set('gameStatus', payload);
    default:
      return state;
  }
};

export default AppReducer;
