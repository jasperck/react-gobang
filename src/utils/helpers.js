import { BOARD_CELL_SIZE } from '@/constants';

/**
 * isCanvasSupported
 */
export function isCanvasSupported() {
  return !!document.createElement('canvas').getContext;
}

/**
 * getCellPosition
 */
export function getCellCoordinate(target, rect) {
  const { clientX, clientY } = target;
  const { left, top } = rect;
  const x = Math.floor((clientX - left) / BOARD_CELL_SIZE);
  const y = Math.floor((clientY - top) / BOARD_CELL_SIZE);

  return { x, y };
}

/*
 * getCellPosition
 */
export function getCellPosition(coordinateX, coordinateY) {
  const x = (BOARD_CELL_SIZE + coordinateX * BOARD_CELL_SIZE) - (BOARD_CELL_SIZE / 2);
  const y = (BOARD_CELL_SIZE + coordinateY * BOARD_CELL_SIZE) - (BOARD_CELL_SIZE / 2);

  return { x, y };
}