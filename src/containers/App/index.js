import { connect } from 'react-redux';
import App from './components/App';
import {
  updateGame,
  updateStatus,
  newGame,
} from './actions';
import { GAME_STATUS_START } from './constants';

const mapStateToProps = (state) => ({
  board: state.getIn(['app', 'board']),
  currentRole: state.getIn(['app', 'currentRole']),
  status: state.getIn(['app', 'gameStatus']),
  mode: state.getIn(['app', 'mode']),
})

const mapDispatchToProps = (dispatch) => ({
  updateGame(play) {
    return dispatch(updateGame(play));
  },
  updateStatus(status) {
    return dispatch(updateStatus(status));
  },
  startGame() {
    return dispatch(updateStatus(GAME_STATUS_START))
  },
  newGame() {
    return dispatch(newGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
