import {combineReducers} from 'redux';
import authReducer from './auth.js';
import groupReducer from './group.js';
import taskReducer from './task.js';
import userReducer from './user.js';
import counterReducer from './../../features/counter/counterSlice';

export default combineReducers({
  auth: authReducer,
  task: taskReducer,
  user: userReducer,
  group: groupReducer,
  counter: counterReducer,
});
