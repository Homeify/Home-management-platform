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

export {
  addGroup,
  getUserGroups
};
