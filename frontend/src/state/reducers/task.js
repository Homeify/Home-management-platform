import { TASK_ACTION_TYPES } from '../types';

export const TaskState = {
};

const taskReducer = (state = TaskState, action) => {
  if (action.type === TASK_ACTION_TYPES.ADD) {
    const newTask = action.payload;
    console.log('test', newTask); // FIXME: TASKS DO NOT RELOAD
    return {
      ...state,
      newTask
    };
  }
  return state;
};

export default taskReducer;
