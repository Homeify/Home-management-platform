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
          const item = res.data;
          item.status = item.status === 'todo' ? 0 : (item.status === 'inprogress' ? 1 : 2);
          item.posted = new Date(item.posted);
          item.deadline = new Date(item.deadline);
          dispatch({
            type: TASK_ACTION_TYPES.UPDATE_TASK,
            payload: item
          });
          return item;
        }).catch((error) => {
          return error;
        })
  );

const updateStatus = (taskId, newTask) =>
  async (dispatch) => {
    const task = await dispatch(updateTask(taskId, newTask));
    dispatch({
      type: TASK_ACTION_TYPES.UPDATE_STATUS,
      payload: task
    });
  };

const declineTask = (task) =>
  async (dispatch) => (
    axios.
        post(`${BASE_URL}/tasks/decline/${task.id}`, null,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          try {
            dispatch({
              type: TASK_ACTION_TYPES.DECLINE_TASK,
              payload: task
            });
          } catch (e) {
            console.log(e);
          }
        }).catch((error) => {
          return 'Not enough points';
        })
  );

const getTaskComments = (taskId) => async (dispatch) =>
    axios
        .get(`${BASE_URL}/tasks/${taskId}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(
                    LOCAL_STORAGE_KEYS.AUTH_TOKEN
                )}`,
            },
        })
        .then((res) => {
            if (res.status === 200) {
                const payload = res.data.data.map((comm) => ({
                  ...comm,
                  date_posted: new Date(comm.date_posted)
                }));
                dispatch({
                    type: TASK_ACTION_TYPES.GET_COMMENTS,
                    payload,
                });
            }
        });

const addCommentToTask = (taskId, body) => async (dispatch) =>
    axios
      .post(`${BASE_URL}/comments`,
            {task_id: taskId, body},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(
                    LOCAL_STORAGE_KEYS.AUTH_TOKEN
                )}`,
              }
            })
      .then((res) => {
          if (res.status === 201 || res.status === 200) {
            const payload = res.data.data;
            dispatch({
              type: TASK_ACTION_TYPES.ADD_COMMENT,
              payload,
            });
          }
      });

const deleteComment = (taskId, commentId) => async (dispatch) =>
    axios.delete(`${BASE_URL}/comments`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(
                LOCAL_STORAGE_KEYS.AUTH_TOKEN
            )}`,
        },
        data: {
            comment_id: commentId,
        },
    })
    .then((res) => {
      dispatch({
          type: TASK_ACTION_TYPES.DELETE_COMMENT,
          payload: {
              commentId,
              taskId,
          },
      });
    });

const updateComment = (taskId, commentId, body) => async (dispatch) =>
    axios.patch(`${BASE_URL}/comments/${commentId}`,
        { comment_id: commentId, body },
        {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem(
                  LOCAL_STORAGE_KEYS.AUTH_TOKEN
              )}`,
          }
        })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        const payload = res.data.data;
        dispatch({
            type: TASK_ACTION_TYPES.UPDATE_COMMENT,
            payload,
        });
      }
    });

export {
  addTask,
  updateTask,
  getGroupTasks,
  declineTask,
  updateStatus,
  getTaskComments,
  addCommentToTask,
  deleteComment,
  updateComment
};
