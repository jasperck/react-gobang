import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  BOARD_SIZE,
  BOARD_CELL_SIZE,
} from '@/constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Canvas = styled.canvas`
  box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;
  background-color: #c19b6c;
`;

class Board extends PureComponent {
  componentDidMount() {
    this.draw();
  }

  componentWillUpdate() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }

  draw = () => {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    Array.from(Array(BOARD_SIZE + 1)).forEach((v, i) => {
      ctx.moveTo(20 + i * BOARD_CELL_SIZE, 20);
      ctx.lineTo(20 + i * BOARD_CELL_SIZE, BOARD_CELL_SIZE * BOARD_SIZE + 20);
      ctx.stroke();
      ctx.moveTo(20, 20 + i * BOARD_CELL_SIZE);
      ctx.lineTo(BOARD_CELL_SIZE * BOARD_SIZE + 20, 20 + i * BOARD_CELL_SIZE);
      ctx.stroke();
    });
    ctx.closePath();
  }

  setCanvasRef = ref => {
    this.canvas = ref;
    this.props.setBoardRef(ref);
  }

  render() {
    const { handleOnClick, children } = this.props;

    return (
      <Wrapper>
        <Canvas
          innerRef={this.setCanvasRef}
          width={BOARD_CELL_SIZE * BOARD_SIZE + BOARD_CELL_SIZE}
          height={BOARD_CELL_SIZE * BOARD_SIZE + BOARD_CELL_SIZE}
          onClick={handleOnClick}
        >
          {children}
        </Canvas>
      </Wrapper>
    );
  }
};

export default Board;
