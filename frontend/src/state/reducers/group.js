import { GROUP_ACTION_TYPES } from '../types';

export const GroupState = {
  groups: []
};

const groupReducer = (state = GroupState, action) => {
  if (action.type === GROUP_ACTION_TYPES.GET_USER_GROUPS) {
    return {
      ...state,
      groups: action.payload
    };
  }
  return state;
};

export default groupReducer;
