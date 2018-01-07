/**
 * 
 * App constants
 * 
 */

/**
 * ACTION TYPE
 */
export const UPDATE_GAME = 'app/App/UPDATE_GAME';
export const UPDATE_STATUS = 'app/App/UPDATE_STATUS';
export const NEW_GAME = 'app/App/NEW_GAME';

/**
 * BOARD STATUS
 */
export const EMPTY = 0;
export const BLACK = 1;
export const WHITE = 2;

export const roleMaps = {
  [WHITE]: 'WHITE',
  [BLACK]: 'BLACK',
};

/**
 * GAME STATUS
 */
export const GAME_STATUS_STOP = 0;
export const GAME_STATUS_START = 1;
export const GAME_STATUS_FINISH = 2;

/**
 * RENDER MODE
 */
export const CANVAS = 'canvas';
export const DOM = 'dom';