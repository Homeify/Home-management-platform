import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  AddTaskIcon,
  DeclineTaskIcon,
  DotsIcon,
  EditIcon,
  TrashIcon,
} from '../../../assets/icons';
import { connect } from 'react-redux';
import { declineTask, updateTask } from '../../../state/actions/task';

const TaskMenu = ({ showEditModal, taskId, task, updateTask, declineTask, currentUserId }) => {
  const { t } = useTranslation();

  const isAssigned = !!task?.assigned_user;
  const toggleAssignee = async () => {
    if (!isAssigned) {
      updateTask(taskId, {assigned_user_id: currentUserId});
    } else {
      const res = await declineTask(task);
      if (res) {
        alert(res);
      }
    }
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<DotsIcon />}
        variant='ghost'
        borderRadius='full'
        mr='2'
      />
      <MenuList>
        {task?.status !== 2 && <MenuItem icon={!isAssigned ? <AddTaskIcon size='14pt' /> : <DeclineTaskIcon size='14pt'/>}
          onClick={toggleAssignee}>
          {t(!isAssigned ? 'assignTask' : 'declineTask')}
        </MenuItem> }
        <MenuItem
          icon={<EditIcon size='14pt' />}
          onClick={showEditModal}
        >
          {t('edit')}
        </MenuItem>
        <MenuItem icon={<TrashIcon size='14pt' />} color='red.300'>
          {t('deleteTask')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};


const mapStateToProps = (state, ownProps) => {
  return {
    task: state.task.tasks.find((item) => item.id === ownProps.taskId),
    currentUserId: state.auth.currentUser?.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateTask: (taskId, task) => dispatch(updateTask(taskId, task)),
    declineTask: (task) => dispatch(declineTask(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskMenu);
