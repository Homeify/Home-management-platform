import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { TASK_ACTION_TYPES } from '../types';
import { getGroupTasks } from './group';

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
                    type: TASK_ACTION_TYPES.ADD,
                    payload: res.data,
                });
            }
        });
};

const updateTask = (taskId, groupId, newData) => async (dispatch) =>
    axios
        .patch(`${BASE_URL}/tasks/${taskId}`, newData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    LOCAL_STORAGE_KEYS.AUTH_TOKEN
                )}`,
            },
        })
        .then((res) => {
            if (res.status === 204) {
                dispatch(getGroupTasks(groupId));
            }
        });

export { addTask, updateTask };
