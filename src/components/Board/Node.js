import styled from 'styled-components';
import { BOARD_CELL_SIZE } from './constants';

const Node = styled.div`
  display: flex;
  width: ${BOARD_CELL_SIZE}px;
  height: ${BOARD_CELL_SIZE}px;
  border: 1px solid black;
  box-sizing: border-box;
`;

export default Node;
