import { GROUP_ACTION_TYPES, TASK_ACTION_TYPES } from '../types';

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
  } else if (action.type === GROUP_ACTION_TYPES.ADD || action.type === GROUP_ACTION_TYPES.JOIN) {
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
  } else if (action.type === TASK_ACTION_TYPES.UPDATE_STATUS || action.type === TASK_ACTION_TYPES.DECLINE_TASK) {
    const { assigned_user_id, group_id, status, reward } = action.payload;
    const index = state.groups.findIndex((item) => item.id === group_id);
    const userIndex = index !== -1 ? state.groups[index].members.findIndex((item) => item.id === assigned_user_id) : -1;
    if (userIndex === -1) {
      return state;
    }
    let currentAward = state.groups[index].members[userIndex].awards;
    if (action.type === TASK_ACTION_TYPES.UPDATE_STATUS && status === 2) {
      currentAward += reward;
    }
    if (action.type === TASK_ACTION_TYPES.DECLINE_TASK) {
      currentAward -= reward;
    }
    return {
      ...state,
      groups: [
        ...state.groups.slice(0, index),
        {
          ...state.groups[index],
          members: [
            ...state.groups[index].members.slice(0, userIndex),
            {
              ...state.groups[index].members[userIndex],
              awards: currentAward
            },
            ...state.groups[index].members.slice(userIndex + 1),
          ]
        },
        ...state.groups.slice(index + 1)
      ]
    };
  }
  return state;
};

export default groupReducer;
