import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {GROUP_ACTION_TYPES} from '../types';

const addGroup = (group) => (
  async (dispatch) => {
    return axios
        .post(`${BASE_URL}/groups/add`, group, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            dispatch({
              type: GROUP_ACTION_TYPES.ADD,
              payload: res.data
            });
          }
        });
  }
);

const getUserGroups = () =>
  async (dispatch) => {
    return axios
        .get(`${BASE_URL}/groups`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            const payload = res.data;
            dispatch({
              type: GROUP_ACTION_TYPES.GET_USER_GROUPS,
              payload
            });
          }
        });
  };

const getMembers = (groupId) =>
  async (dispatch) => (
    axios
        .get(`${BASE_URL}/groups/users/${groupId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            const payload = res.data;
            dispatch({
              type: GROUP_ACTION_TYPES.GET_MEMBERS,
              payload: {
                groupId,
                members: payload
              }
            });
          }
        })
  );

const deleteGroup = (groupId) =>
  async (dispatch) => (
    axios
        .delete(`${BASE_URL}/groups/${groupId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
        })
        .then((res) => {
          dispatch({
            type: GROUP_ACTION_TYPES.DELETE_GROUP,
            payload: {
              groupId
            }
          });
        })
  );

export {
  addGroup,
  getUserGroups,
  getMembers,
  deleteGroup
};