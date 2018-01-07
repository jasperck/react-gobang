import React, { Component } from 'react';
import Board from '@/components/Board';
import Helmet from '@/components/Helmet';
import Elapsed from '@/components/Elapsed';
import referee from '@/utils/referee';
import { getCellCoordinate, getCellPosition } from '@/utils/helpers';
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
      const { currentRole: role } = this.props;
      const { x: coordinateX, y: coordinateY } = getCellCoordinate(e, this.rect);
      const { x, y } = getCellPosition(coordinateX, coordinateY);
      const cell = [coordinateX, coordinateY];
      const play = {
        x,
        y,
        cell,
        role,
      };
      
      /**
       * update game info
       */
      this.props.updateGame(play);

      /**
       * judge win
       */
      const { board } = this.props;

      const judgement = referee(role, ...cell)(board);

      if (judgement === GAME_STATUS_STOP) {
        this.props.updateStatus(GAME_STATUS_STOP)

        setTimeout(() => alert(`${roleMaps[role]} win!`), 0);
      }
    }
  }

  setBoardRef = (board) => {
    this.boardRef = board;
    this.rect = this.boardRef.getBoundingClientRect();
  }

  render() {
    const { board, status} = this.props;

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
          <Pieces
            board={board}
            boardRef={this.boardRef}
          />
        </Board>
        <Elapsed status={status} />
      </Wrapper>
    );
  }
}

export default App;
