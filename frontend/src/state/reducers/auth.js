import { AUTH_ACTION_TYPES } from '../types';

export const AuthState = {
  authenticated: false,
  currentUser: undefined
};

const authReducer = (state = AuthState, action) => {
  if (action.type === AUTH_ACTION_TYPES.SIGN_IN) {
    return {
      ...state,
      authenticated: true,
      currentUser: action.payload
    };
  } else if (action.type === AUTH_ACTION_TYPES.SIGN_OUT) {
    return {
      authenticated: false,
      currentUser: undefined
    };
  } else if (action.type === AUTH_ACTION_TYPES.EDIT_USERNAME) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        username: action.payload.username
      }
    };
  } else if (action.type === AUTH_ACTION_TYPES.EDIT_EMAIL) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        email: action.payload.email
      }
    };
  } else if (action.type === AUTH_ACTION_TYPES.EDIT_PASSWORD) {
    return {
      ...state,
    };
  }
  return state;
};

export default authReducer;
