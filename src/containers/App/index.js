import { connect } from 'react-redux';
import App from './components/App';
import {
  updateGame,
  updateStatus,
} from './actions';

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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
