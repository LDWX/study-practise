import { combineReducers } from 'redux';
import home from '@/Home/model/reducer';
import about from '@/About/model/reducer';

export default combineReducers({
  home,
  about,
});