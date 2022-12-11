import EmptyBoxAnimation from './EmptyBoxAnimation';
import NotFoundAnimation from './NotFoundAnimation';
import Animation from './Animation';

import groupAnimationData from '../../../assets/animations/group.json';
import inviteFriendsAnimationData from '../../../assets/animations/invite_friends.json';
import taskDeadlineAnimationData from '../../../assets/animations/task_deadline.json';
import taskListAnimationData from '../../../assets/animations/task_list.json';

const ANIMATION_DATA = {
    GROUP: groupAnimationData,
    INVITE_FRIENDS: inviteFriendsAnimationData,
    TASK_DEADLINE: taskDeadlineAnimationData,
    TASK_LIST: taskListAnimationData,
};

export { Animation, EmptyBoxAnimation, NotFoundAnimation, ANIMATION_DATA };
