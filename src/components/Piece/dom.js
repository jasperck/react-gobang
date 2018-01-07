import React from 'react';
import styled from 'styled-components';
import { BLACK } from '@/containers/App/constants';
import {
  PIECE_SIZE,
  COLOR_BLACK,
  COLOR_WHITE,
} from '@/constants';

const Wrapper = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${PIECE_SIZE}px;
  height: ${PIECE_SIZE}px;
  border-radius: 50%;
  background-color: ${props => (props.role === BLACK ? COLOR_BLACK : COLOR_WHITE)};
  box-shadow:
    0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
    0 0 0.05rem rgba(240, 240, 240, 0.5),
    0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
    0.1rem .1rem .1rem rgba(255, 255, 255, 0.05) inset,
    -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
    -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
`;

/**
 * Dom Piece
 */
const Piece = ({ x, y, role, key }) => (
  <Wrapper
    key={key}
    left={x}
    top={y}
    role={role}
  />
);

export default Piece;