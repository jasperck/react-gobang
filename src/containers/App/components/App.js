import React, { Component } from 'react';
import Board from '@/components/Board';
import Helmet from '@/components/Helmet';
import { BOARD_CELL_SIZE } from '@/components/Board/constants';
import referee from '@/utils/referee';
import Wrapper from './Wrapper';
import Pieces from './Pieces';
import {
  roleMaps,
  GAME_STATUS_STOP,
} from '../constants';

class App extends Component {
  handleOnclick = (e) => {
    if (this.props.status === GAME_STATUS_STOP) {
      return;
    }

    if (this.boardRef) {
      /**
       * get piece position
       */
      const { currentRole } = this.props;
      const { clientX, clientY } = e;
      const { left, top } = this.rect;
      const cellX = Math.round((clientX - left) / BOARD_CELL_SIZE);
      const cellY = Math.round((clientY - top) / BOARD_CELL_SIZE)
      const x = (cellX * BOARD_CELL_SIZE) - (BOARD_CELL_SIZE / 2);
      const y = (cellY * BOARD_CELL_SIZE) - (BOARD_CELL_SIZE / 2);
      const cell = [cellX, cellY]
      const play = {
        cell,
        role: currentRole,
        x,
        y,
      };
      
      /**
       * update game info
       */
      this.props.updateGame(play);

      /**
       * judge win
       */
      const { board } = this.props;

      const judgement = referee(currentRole, ...cell)(board);

      if (judgement === GAME_STATUS_STOP) {
        this.props.updateStatus(GAME_STATUS_STOP)

        alert(`${roleMaps[currentRole]} win!`);
      }
    }
  }

  setBoardRef = (board) => {
    this.boardRef = board;
    this.rect = this.boardRef.getBoundingClientRect();
  }

  render() {
    const { board, pieces } = this.props;

    if (!board) {
      return null;
    }

    return (
      <Wrapper>
        <Helmet />
        <Board
          board={board}
          setBoardRef={this.setBoardRef}
          handleOnClick={this.handleOnclick}
        >
          <Pieces board={board} />
        </Board>
      </Wrapper>
    );
  }
}

export default App;
