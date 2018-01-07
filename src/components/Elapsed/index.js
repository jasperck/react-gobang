import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import {
  GAME_STATUS_START,
  GAME_STATUS_STOP,
  GAME_STATUS_FINISH,
} from '@/containers/App/constants';

class Elapsed extends PureComponent {
  state = {
    elapsed: 0,
    startTime: 0,
  }

  componentDidMount() {
    if (this.props.status === GAME_STATUS_START) {
      this.tick();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    if (status !== this.props.status && status === GAME_STATUS_START) {
      this.tick();
    }

    if (this.timer && (status === GAME_STATUS_STOP || status === GAME_STATUS_FINISH)) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  tick() {
    this.setState({
      startTime: Date.now(),
    }, () => (
      this.timer = setInterval(() => (
        this.setState({ elapsed: Date.now() - this.state.startTime })
      ), 1000)
    ))
  }

  render() {
    const { elapsed } = this.state;

    return (
      <Moment format="mm:ss">
        {elapsed}
      </Moment>
    );
  }
}

export default Elapsed;
