import styled from 'styled-components';
import {
  BOARD_SIZE,
  BOARD_CELL_SIZE,
} from './constants';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: ${BOARD_CELL_SIZE * BOARD_SIZE}px;
`;

export default Wrapper;
