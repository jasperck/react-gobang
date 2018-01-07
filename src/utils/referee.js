import { BOARD_SIZE } from '@/constants';
import {
  GAME_STATUS_STOP,
  GAME_STATUS_START,
} from '@/containers/App/constants';
import {
  HORIZONTAL,
  VERTICAL,
  RIGHT_DIAGONAL,
  LEFT_DIAGONAL,
} from './constants';

function isSameRole(targetRole, currentRole) {
  return targetRole === currentRole;
}

const referee = (role, x, y) => {
  const counters = {
    [HORIZONTAL]: 1,
    [VERTICAL]: 1,
    [RIGHT_DIAGONAL]: 1,
    [LEFT_DIAGONAL]: 1,
  };

  return (board) => {
    /**
     * check horizontal
     */
    for (let i = x - 1; i >= 0; i--) {
      if (!isSameRole(board.getIn([i, y, 'role']), role)) {
        break;
      }
      counters[HORIZONTAL] += 1;
    }

    for (let i = x + 1; i < BOARD_SIZE; i++) {
      if (!isSameRole(board.getIn([i, y, 'role']), role)) {
        break;
      }
      counters[HORIZONTAL] += 1;
    }

    /**
     * check vertical
     */
    for (let i = y - 1; i >= 0; i--) {
      if (!isSameRole(board.getIn([x, i, 'role']), role)) {
        break;
      }
      counters[VERTICAL] += 1;
    }

    for (let i = y + 1; i < BOARD_SIZE; i++) {
      if (!isSameRole(board.getIn([x, i, 'role']), role)) {
        break;
      }
      counters[VERTICAL] += 1;
    }

    /**
     * check - diagonal
     */
    for (let i = x - 1, j = y - 1; i >= 0, j >= 0; i--, j--) {
      if (!isSameRole(board.getIn([i, j, 'role']), role)) {
        break;
      }
      counters[LEFT_DIAGONAL] += 1;
    }

    for (let i = x + 1, j = y + 1; i < BOARD_SIZE, j < BOARD_SIZE; i++, j++) {
      if (!isSameRole(board.getIn([i, j, 'role']), role)) {
        break;
      }
      counters[LEFT_DIAGONAL] += 1;
    }

    /**
     * check + diagonal
     */
    for (let i = x + 1, j = y - 1; i < BOARD_SIZE, j >= 0; i++, j--) {
      if (!isSameRole(board.getIn([i, j, 'role']), role)) {
        break;
      }
      counters[RIGHT_DIAGONAL] += 1;
    }

    for (let i = x - 1, j = y + 1; i >= 0, j < BOARD_SIZE; i--, j++) {
      if (!isSameRole(board.getIn([i, j, 'role']), role)) {
        break;
      }
      counters[RIGHT_DIAGONAL] += 1;
    }

    let judgement = GAME_STATUS_START;

    Object.keys(counters).forEach(dim => {
      if (counters[dim] >= 5) {
        judgement = GAME_STATUS_STOP;
      }
    });

    return judgement;
  }
};

export default referee;
