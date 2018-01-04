import styled from 'styled-components';
import { PIECE_SIZE } from './constants';
import { BLACK } from '@/containers/App/constants';

const Wrapper = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${PIECE_SIZE}px;
  height: ${PIECE_SIZE}px;
  border-radius: 50%;
  background-color: ${props => (props.role === BLACK ? 'black' : 'white')};
  box-shadow: .01rem .01rem .1rem rgba(0, 0, 0, .5), 0 0 .05rem rgba(240, 240, 240, .5), .05rem .05rem .01rem rgba(255, 255, 255, .15) inset, .1rem .1rem .1rem rgba(255, 255, 255, .05) inset, -.05rem -.05rem .25rem rgba(0, 0, 0, .15) inset, -.1rem -.1rem .35rem rgba(0, 0, 0, .05) inset;
`;

export default Wrapper;
