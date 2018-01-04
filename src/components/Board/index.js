import React from 'react';
import shortid from 'shortid';
import Wrapper from './Wrapper';
import Node from './Node';

const Board = ({ board, handleOnClick, setBoardRef, children }) => (
  <Wrapper onClick={handleOnClick} innerRef={setBoardRef}>
    {
      board.map((col) => (
        col.map((c) => (
          <Node key={shortid.generate()} />
        ))
      ))
    }
    {children}
  </Wrapper>
);

export default Board;
