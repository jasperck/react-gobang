import React from 'react';
import styled from 'styled-components';
import Elapsed from '@/components/Elapsed';
import { StartButton, ResetButton } from '@/components/Buttons';
import { GAME_STATUS_STOP } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 35px 0 0;
  font-size: 40px;
  position: relative;
  align-items: center;
`;

const Aside = ({ status, handleStartGameOnClick, handleNewGameOnClick }) => (
  <Wrapper>
    <Elapsed status={status} />
    <StartButton disable={status !== GAME_STATUS_STOP} handleOnClick={handleStartGameOnClick} />
    <ResetButton handleOnClick={handleNewGameOnClick} />
  </Wrapper>
);

export default Aside;
