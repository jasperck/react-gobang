import { isCanvasSupported } from '@/utils/helpers';
import Canvas from './canvas';
import DOM from './dom';

const Piece = isCanvasSupported() ? Canvas : DOM;

export default Piece;