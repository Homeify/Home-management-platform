import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { AUTH_ACTION_TYPES } from '../types';

const signUp = (newUser) => async (dispatch) => {
    const { password, ...user } = newUser;
    const oldUser = { ...user, password1: password, password2: password };
    await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        body: JSON.stringify(oldUser),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const signIn = (newUser) => async (dispatch) => {
    return axios.post(`${BASE_URL}/users/login`, newUser).then((res) => {
        const payload = res.data;
        if (payload?.access) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, payload.access);
            dispatch({
                type: AUTH_ACTION_TYPES.SIGN_IN,
            });
            dispatch(getCurrentUser());
        }
    });
};

const getCurrentUser = () => async (dispatch) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    return axios
        .get(`${BASE_URL}/users/view/current_user`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                const payload = res.data;
                dispatch({
                    type: AUTH_ACTION_TYPES.GET_CURRENT_USER,
                    payload,
                });
            }
        });
};

const signOut = () => async (dispatch) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    await fetch(`${BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('persist:root');
    dispatch({
        type: AUTH_ACTION_TYPES.SIGN_OUT,
    });
  }
);

export { signIn, signUp, signOut };
