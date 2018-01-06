import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { GAME_STATUS_STOP } from '@/containers/App/constants';

const Wrapper = styled(Moment) `
  display: flex;
  margin: 35px 35px 0 0;
  font-size: 40px;
  position: relative;
  height: 45px;
`;

class Elapsed extends PureComponent {
  state = {
    elapsed: 0,
    startTime: Date.now(),
  }

  componentDidMount() {
    this.timer = setInterval(() => (
      this.setState({ elapsed: Date.now() - this.state.startTime })
    ), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === GAME_STATUS_STOP) {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { elapsed } = this.state;

    return (
      <Wrapper format="mm:ss">
        {elapsed}
      </Wrapper>
    );
  }
}

export default Elapsed;
