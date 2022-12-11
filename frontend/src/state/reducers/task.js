import { TASK_ACTION_TYPES } from '../types.js';

export const TaskState = {
  tasks: []
};

const taskReducer = (state = TaskState, action) => {
  if (action.type === TASK_ACTION_TYPES.UPDATE_TASK) {
    const { updatedTask } = action.payload;
    const index = state.tasks.findIndex((item) => item.id === updatedTask.id);
    return {
      ...state,
      tasks: [
        ...state.tasks.slice(0, index),
        updatedTask,
        ...state.tasks.slice(index + 1)
      ]
    };
  }
  return state;
};

export default taskReducer;
