import React from 'react';
import shortid from 'shortid';
import Piece from '@/components/Piece';
import { EMPTY } from '@/containers/App/constants';

const Pieces = ({ board, boardRef }) => {
  const pieces = board
    .flatten(1)
    .filter(p => p.get('role') !== EMPTY);

  return pieces.size > 0
    ? pieces.map(piece => (
        Piece({
          boardRef,
          x: piece.get('x'),
          y: piece.get('y'),
          role: piece.get('role'),
          key: shortid.generate(),
        }
      )))
    : null;
};

export default Pieces;
