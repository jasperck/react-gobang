import React from 'react';
import styled, { css } from 'styled-components';
import {
  COLOR_WHITE,
  COLOR_GREEN,
  COLOR_BLUE,
} from '@/constants';

const button = css`
  width: 130px;
  background-color: ${COLOR_WHITE};
  text-align: center;
  height: 40px;
  border-radius: 20px;
  margin-top: 20px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: ${COLOR_WHITE};
  }
`;

const StartBtn = styled.button`
  ${button};
  border: 2px solid ${COLOR_GREEN};
  color: ${COLOR_GREEN};
  &:hover {
    background-color: ${COLOR_GREEN};
  }
  cursor: ${props => (props.disable ? 'not-allowed' : 'cursor')};
`;

const ResetBtn = styled.button`
  ${button};
  border: 2px solid ${COLOR_BLUE};
  color: ${COLOR_BLUE};
  &:hover {
    background-color: ${COLOR_BLUE};
  }
`;

export const StartButton = ({ disable, handleOnClick }) => (
  <StartBtn disable={disable} onClick={handleOnClick}>Start Game</StartBtn>
);

export const ResetButton = ({ handleOnClick }) => (
  <ResetBtn onClick={handleOnClick}>New Game</ResetBtn>
);