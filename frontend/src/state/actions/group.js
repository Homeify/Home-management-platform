import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { GROUP_ACTION_TYPES } from '../types';

const addGroup = (group) => async (dispatch) => {
  return axios
      .post(`${BASE_URL}/groups/add`, group, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          dispatch({
            type: GROUP_ACTION_TYPES.ADD,
            payload: res.data,
          });
        }
      });
};

const joinGroup = (code) => async (dispatch) => {
  return axios
      .post(`${BASE_URL}/groups/user`, {code: code}, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem(
                  LOCAL_STORAGE_KEYS.AUTH_TOKEN
              )}`,
          },
      })
      .then((res) => {
          if (res.status === 201 || res.status === 200) {
              dispatch({
                  type: GROUP_ACTION_TYPES.JOIN,
                  payload: {
                      ...res.data
                  }
              });
          }
      });
};

const editGroup = (group) => async (dispatch) => {
    return axios
        .patch(`${BASE_URL}/groups/${group.id}`, group, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    LOCAL_STORAGE_KEYS.AUTH_TOKEN
                )}`,
            },
        })
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                dispatch({
                    type: GROUP_ACTION_TYPES.EDIT,
                    payload: {
                        id: group.id,
                        ...res.data
                    }
                });
            }
        });
};

const getUserGroups = () => async (dispatch) => {
  return axios
      .get(`${BASE_URL}/groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          const payload = res.data;
          dispatch({
            type: GROUP_ACTION_TYPES.GET_USER_GROUPS,
            payload,
          });
        }
      });
};

const getMembers = (groupId) => async (dispatch) =>
  axios
      .get(`${BASE_URL}/groups/users/${groupId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          const payload = res.data;
          dispatch({
            type: GROUP_ACTION_TYPES.GET_MEMBERS,
            payload: {
              groupId,
              members: payload,
            },
          });
        }
      });

const deleteGroup = (groupId) => async (dispatch) =>
  axios
      .delete(`${BASE_URL}/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              LOCAL_STORAGE_KEYS.AUTH_TOKEN
          )}`,
        },
      })
      .then((res) => {
        dispatch({
          type: GROUP_ACTION_TYPES.DELETE_GROUP,
          payload: {
            groupId,
          },
        });
      });

const removeUserFromGroup = ({groupId, userId}) =>
  async (dispatch) => (
    axios
        .delete(`${BASE_URL}/groups/user/admin`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              },
              data: {
                code: groupId,
                user_id: userId
              }
            })
        .then((res) => {
          dispatch({
            type: GROUP_ACTION_TYPES.REMOVE_USER,
            payload: {
              groupId,
              userId
            }
          });
        })
  );

export {
  addGroup,
  editGroup,
  joinGroup,
  getUserGroups,
  getMembers,
  deleteGroup,
  removeUserFromGroup
};
