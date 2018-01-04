import React, { Fragment } from 'react';
import shortid from 'shortid';
import Piece from '@/components/Piece';
import { EMPTY } from '@/containers/App/constants';

const Pieces = ({ board }) => {
  const pieces = board
    .flatten(1)
    .filter(p => p.get('role') !== EMPTY);

  return pieces.size > 0
    ? (
      <Fragment>
        {pieces.map(piece => (
          <Piece
            key={shortid.generate()}
            x={piece.get('x')}
            y={piece.get('y')}
            role={piece.get('role')}
          />
        ))}
      </Fragment>
    )
    : null;
};

export default Pieces;
