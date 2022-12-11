import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { getGroupTasks } from './group';

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

export { updateTask };
