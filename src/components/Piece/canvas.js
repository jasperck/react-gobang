import { BLACK } from '@/containers/App/constants';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_GREY,
  PIECE_SIZE,
} from '@/constants';

const radius = PIECE_SIZE / 2;

/**
 * Canvas Piece
 */
const Piece = ({ boardRef, role, x, y }) => {
  const context = boardRef.getContext('2d');

  // draw circle
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, true);
  context.closePath();

  // fill color
  if (role === BLACK) {
    context.fillStyle = COLOR_BLACK;
  } else {
    context.strokeStyle = COLOR_GREY;
    context.fillStyle = COLOR_WHITE;
    context.stroke();
  }
  context.fill();
};

export default Piece;
