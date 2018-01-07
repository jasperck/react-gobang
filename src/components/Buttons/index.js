import React from 'react';
import styled, { css } from 'styled-components';
import { BUTTON_COLOR_GREEN } from './constants';

const button = css`
  width: 130px;
  background-color: #FFFFFF;
  text-align: center;
  height: 40px;
  border-radius: 20px;
  margin-top: 20px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #FFFFFF;
  }
`;
const StartBtn = styled.button`
  ${button};
  border: 2px solid ${BUTTON_COLOR_GREEN};
  color: ${BUTTON_COLOR_GREEN};
  &:hover {
    background-color: ${BUTTON_COLOR_GREEN};
  }
  cursor: ${props => (props.disable ? 'not-allowed' : 'cursor')};
`;
const ResetBtn = styled.button`
  ${button};
  border: 2px solid #69aff6;
  color: #69aff6;
  &:hover {
    background-color: #69aff6;
  }
`;

export const StartButton = ({ disable, handleOnClick }) => (
  <StartBtn disable={disable} onClick={handleOnClick}>Start Game</StartBtn>
);

export const ResetButton = ({ handleOnClick }) => (
  <ResetBtn onClick={handleOnClick}>New Game</ResetBtn>
);