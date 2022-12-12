import { TASK_ACTION_TYPES } from '../types.js';

export const TaskState = {
  tasks: []
};

const taskReducer = (state = TaskState, action) => {
  if (action.type === TASK_ACTION_TYPES.ADD_TASK) {
    const newTask = {
      ...action.payload.message,
      status: 0
    }
    return {
      ...state,
      tasks: [
        ...state.tasks,
        newTask
      ]
    }
  } else if (action.type === TASK_ACTION_TYPES.UPDATE_TASK) {
    const updatedTask = action.payload;
    const index = state.tasks.findIndex((item) => item.id === updatedTask.id);
    return {
      ...state,
      tasks: [
        ...state.tasks.slice(0, index),
        updatedTask,
        ...state.tasks.slice(index + 1)
      ]
    };
  } else if (action.type === TASK_ACTION_TYPES.GET_TASKS_BY_GROUP) {
    return {
      ...state,
      tasks: action.payload
    };
  } else if (action.type === TASK_ACTION_TYPES.DECLINE_TASK) {
    const index = state.tasks.findIndex((item) => item.id === action.payload);
    return {
      ...state,
      tasks: [
        ...state.tasks.slice(0, index),
        {
          ...state.tasks[index],
          assigned_user: null
        },
        ...state.tasks.slice(index + 1)
      ]
    };
  }
  return state;
};

export default taskReducer;
