import axios from 'axios';
import {BASE_URL, LOCAL_STORAGE_KEYS} from '../../utils/constants';
import {TASK_ACTION_TYPES} from '../types';

const updateTask = (newTask, taskId) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/tasks/${taskId}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              },
              data: newTask
            })
        .then((res) => {
          dispatch({
            type: TASK_ACTION_TYPES.UPDATE_TASK,
            payload: res.data
          });
        })
  );

export {
  updateTask
};
