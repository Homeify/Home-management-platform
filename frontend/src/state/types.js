const AUTH_ACTION_TYPES = {
  ERROR: 'ERROR',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const GROUP_ACTION_TYPES = {
  ADD: 'ADD_GROUP',
  EDIT: 'EDIT_GROUP',
  GET_USER_GROUPS: 'GET_USER_GROUPS',
  GET_MEMBERS: 'GET_MEMBERS',
  DELETE_GROUP: 'DELETE_GROUP',
  REMOVE_USER: 'REMOVE_USER_FROM_GROUP'
};

const TASK_ACTION_TYPES = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  GET_TASKS_BY_GROUP: 'GET_TASKS_BY_GROUP',
  DECLINE_TASK: 'DECLINE_TASK'
};

export {
  AUTH_ACTION_TYPES,
  GROUP_ACTION_TYPES,
  TASK_ACTION_TYPES
};
