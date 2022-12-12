import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { TASK_ACTION_TYPES } from '../types';

const addTask = (task) => async (dispatch) => {
  return axios
    .post(`${BASE_URL}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEYS.AUTH_TOKEN
        )}`,
      },
    })
    .then((res) => {
        if (res.status === 201 || res.status === 200) {
          dispatch({
            type: TASK_ACTION_TYPES.ADD_TASK,
            payload: res.data,
          });
        }
      });
};

const getGroupTasks = (groupId) =>
  async (dispatch) => (
    axios
        .get(`${BASE_URL}/groups/tasks/${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
                LOCAL_STORAGE_KEYS.AUTH_TOKEN
            )}`,
          },
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            const payload = res.data.data.map((item) => {
              const newStatus =
                        item.status === 'todo' ?
                            0 :
                            item.status === 'inprogress' ?
                            1 :
                            2;
              const newPosted = new Date(item.posted);
              const newDeadline = new Date(item.deadline);
              return {
                ...item,
                posted: newPosted,
                deadline: newDeadline,
                status: newStatus,
              };
            });
            dispatch({
              type: TASK_ACTION_TYPES.GET_TASKS_BY_GROUP,
              payload,
            });
          }
        }));

const updateTask = (taskId, newTask) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/tasks/${taskId}`,
            newTask,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          dispatch({
            type: TASK_ACTION_TYPES.UPDATE_TASK,
            payload: res.data
          });
        }).catch((error) => {
          return error;
        })
  );

const declineTask = (taskId) =>
  async (dispatch) => (
    axios.
        post(`${BASE_URL}/tasks/decline/${taskId}`, null,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          dispatch({
            type: TASK_ACTION_TYPES.DECLINE_TASK,
            payload: taskId
          });
        }).catch((error) => {
          return 'Not enough points';
        })
  );
export {
  addTask,
  updateTask,
  getGroupTasks,
  declineTask
};
