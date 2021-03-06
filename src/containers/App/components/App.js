import React, { PureComponent } from 'react';
import Board from '@/components/Board';
import Helmet from '@/components/Helmet';
import referee from '@/utils/referee';
import {
  getCellCoordinate,
  getCellPosition,
} from '@/utils/helpers';
import Wrapper from './Wrapper';
import Pieces from './Pieces';
import Aside from './Aside';
import {
  roleMaps,
  GAME_STATUS_STOP,
  GAME_STATUS_FINISH,
} from '../constants';

class App extends PureComponent {
  handleOnclick = (e) => {
    const { status } = this.props;

    if (status === GAME_STATUS_STOP || status === GAME_STATUS_FINISH) {
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
      if (this.shouldGameFinish(role, cell)) {
        this.handleGameFinish(role);
      }
    }
  }

  setBoardRef = (board) => {
    this.boardRef = board;
    this.rect = this.boardRef.getBoundingClientRect();
  }

  shouldGameFinish = (role, cell) => {
    return referee(role, ...cell)(this.props.board) === GAME_STATUS_FINISH;
  }

  handleGameFinish = (role) => {
    this.props.updateStatus(GAME_STATUS_FINISH);

    setTimeout(() => alert(`${roleMaps[role]} win!`), 0);
  }

  handleNewGameOnClick = () => {
    this.props.newGame();
  }

  handleStartGameOnClick = () => {
    if (this.props.status === GAME_STATUS_STOP) {
      this.props.startGame();
    }
  }

  render() {
    const { board, status } = this.props;

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
        <Aside
          status={status}
          handleStartGameOnClick={this.handleStartGameOnClick}
          handleNewGameOnClick={this.handleNewGameOnClick}
        />
      </Wrapper>
    );
  }
}

export default App;
