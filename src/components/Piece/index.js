import React from 'react';
import Wrapper from './Wrapper';

const Piece = ({ x, y, role }) => (
  <Wrapper
    left={x}
    top={y}
    role={role}
  />
);

export default Piece;
