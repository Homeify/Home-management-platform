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
  } else if (action.type === GROUP_ACTION_TYPES.GET_MEMBERS) {
    const { groupId, members } = action.payload;
    const groupIndex = state.groups.findIndex((item) => item.id === groupId);
    const newGroup = {
      ...state.groups[groupIndex],
      members: members.map((member) => {
        const { user, ..._member} = member;
        return {
          ..._member,
          ...user
        };
      })
    };
    return {
      ...state,
      groups: [
        ...state.groups.slice(0, groupIndex),
        newGroup,
        ...state.groups.slice(groupIndex + 1)
      ]
    };
  } else if (action.type === GROUP_ACTION_TYPES.DELETE_GROUP) {
    const groupIndex = state.groups.findIndex((item) => item.id === action.payload.groupId);
    return {
      ...state,
      groups: [
        ...state.groups.slice(0, groupIndex),
        ...state.groups.slice(groupIndex + 1)
      ]
    };
  } else if (action.type === GROUP_ACTION_TYPES.ADD) {
    return {
      ...state,
      groups: [
        ...state.groups,
        action.payload
      ]
    };
  }
  return state;
};

export default groupReducer;
