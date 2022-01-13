import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from './App';
import * as actions from './model/action';

const mapStateToProps = ({ about, home }) => ({
  count: about.count,
  list: about.list,
  loading: about.loading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);