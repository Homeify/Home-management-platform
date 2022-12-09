import axios from 'axios';
import {BASE_URL} from '../../utils/constants';
import {AUTH_ACTION_TYPES} from '../types';

const signUp = (newUser) => (
  async (dispatch) => {
    const { password, ...user} = newUser;
    const oldUser = { ...user,
      password1: password,
      password2: password,
    };
    await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      body: JSON.stringify(oldUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
);

const signIn = (newUser) => (
  async (dispatch) => {
    return axios
        .post(`${BASE_URL}/users/login`, newUser)
        .then((res) => {
          const payload = res.data;
          if (payload?.access) {
            localStorage.setItem('authToken', payload.access);
            dispatch({
              type: AUTH_ACTION_TYPES.SIGN_IN,
            });
          }
        });
  }
);

const signOut = () => (
  async (dispatch) => {
    const authToken = localStorage.getItem('authToken');
    await fetch(`${BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    });
    localStorage.removeItem('authToken');
    dispatch({
      type: AUTH_ACTION_TYPES.SIGN_OUT,
    });
  }
);

export {
  signIn,
  signUp,
  signOut,
};
