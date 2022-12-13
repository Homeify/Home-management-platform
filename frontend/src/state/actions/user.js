import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { AUTH_ACTION_TYPES } from '../types';

const updateUsername = (username) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/users/edit/username`,
            {username: username},
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            dispatch({
              type: AUTH_ACTION_TYPES.EDIT_USERNAME,
              payload: {
                ...res.data,
                username: username
              }
            });
          }
        }).catch((error) => {
          return error;
        })
  );

  const updateEmail = (email) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/users/edit/email`,
            {email: email},
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            dispatch({
              type: AUTH_ACTION_TYPES.EDIT_EMAIL,
              payload: {
                ...res.data,
                email: email
              }
            });
          }
        }).catch((error) => {
          return error;
        })
  );

  const updatePassword = (password1, password2) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/users/edit/password`,
            {
              password1: password1,
              password2: password2
            },
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            dispatch({
              type: AUTH_ACTION_TYPES.EDIT_PASSWORD,
              payload: res.data
            });
          }
        }).catch((error) => {
          return error;
        })
  );


export { updateUsername, updateEmail, updatePassword};
