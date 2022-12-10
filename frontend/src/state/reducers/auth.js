import {AUTH_ACTION_TYPES} from '../types';

export const AuthState = {
  authenticated: false,
  currentUser: undefined
};

const authReducer = (state = AuthState, action) => {
  if (action.type === AUTH_ACTION_TYPES.SIGN_IN) {
    return {
      authenticated: true,
      currentUser: action.currentUser,
    };
  } else if (action.type === AUTH_ACTION_TYPES.SIGN_OUT) {
    return {
      authenticated: false,
      currentUser: undefined
    };
  } else if (action.type === AUTH_ACTION_TYPES.GET_CURRENT_USER) {
    return {
      ...state,
      currentUser: action.payload
    };
  }
  return state;
};

export default authReducer;
