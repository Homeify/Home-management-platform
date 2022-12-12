import { GROUP_ACTION_TYPES } from '../types';

export const GroupState = {
  groups: [],
  tasks: [],
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
  } else if (action.type === GROUP_ACTION_TYPES.EDIT) {
    const groupIndex = state.groups.findIndex((item) => item.id === action.payload.id);
    const editedGroup = {
      ...state.groups[groupIndex],
      ...action.payload
    };
    return {
      ...state,
      groups: [
        ...state.groups.slice(0, groupIndex),
        editedGroup,
        ...state.groups.slice(groupIndex + 1)
      ]
    };
  } else if (action.type === GROUP_ACTION_TYPES.GET_GROUP_TASKS) {
    return {
      ...state,
      tasks: action.payload
    };
  } else if (action.type === GROUP_ACTION_TYPES.REMOVE_USER) {
    const { groupId, userId } = action.payload;
    const index = state.groups.findIndex((item) => item.id === groupId);
    const userIndex = state.groups[index].members.findIndex((item) => item.id === userId);
    return {
      ...state,
      groups: userIndex !== -1 ? [
        ...state.groups.slice(0, index),
        {
          ...state.groups[index],
          members: [
            ...state.groups[index].members.slice(0, userIndex),
            ...state.groups[index].members.slice(userIndex + 1),
          ]
        },
        ...state.groups.slice(index + 1)
      ] : state.groups
    };
  }
  return state;
};

export default groupReducer;
