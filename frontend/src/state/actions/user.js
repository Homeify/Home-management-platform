import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { USER_ACTION_TYPES } from '../types';

const updateUsername = (username) =>
  async (dispatch) => (
    axios
        .patch(`${BASE_URL}/users/edit/username`,
            username,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
              }
            })
        .then((res) => {
          dispatch({
            type: USER_ACTION_TYPES.EDIT_USERNAME,
            payload: res.data
          });
        }).catch((error) => {
          return error;
        })
  );

export { updateUsername };
