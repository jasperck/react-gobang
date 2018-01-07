import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import {
  BOARD_SIZE,
  BOARD_CELL_SIZE,
} from '@/constants';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: ${BOARD_CELL_SIZE * BOARD_SIZE}px;
  height: ${BOARD_CELL_SIZE * BOARD_SIZE}px;
  background-color: #c19b6c;
  box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;
`;

const Node = styled.div`
  display: flex;
  width: ${BOARD_CELL_SIZE}px;
  height: ${BOARD_CELL_SIZE}px;
  border: 1px solid black;
  box-sizing: border-box;
`;

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
