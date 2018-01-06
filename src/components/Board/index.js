import { isCanvasSupported } from '@/utils/helpers';
import Canvas from './canvas';
import Dom from './dom';

const Board = isCanvasSupported() ? Canvas : Dom;

export default Board;
