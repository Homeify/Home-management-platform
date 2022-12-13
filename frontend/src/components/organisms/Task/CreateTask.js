import React, { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import GroupMembers from '../../molecules/Group/GroupMembers';
import Assigned from '../../atoms/Task/Assigned';
import { connect } from 'react-redux';
import { addTask } from '../../../state/actions/task';


const CreateTask = ({ onClose, open, members, groupId, addTask }) => {
  const { t } = useTranslation();
  const [showMembers, setShowMembers] = useState(false);
  const onShowMembers = () => setShowMembers(true);
  const onHideMembers = () => setShowMembers(false);

  const [task, setTask] = useState({
    title: '',
    content: '',
    deadline: '',
    reward: '',
    priority: '0',
    assigned_user_id: -1
  });

  const isDataValid = task.title.length >= 3 && task.content.length >= 3 && task.reward.length && task.deadline.length && task.assigned_user_id;

  let assignedName;

  if (task.assigned_user_id !== -1) {
    const chosenMember = members.find((member) => {
      return member.id === task.assigned_user_id;
    });

    if (chosenMember) {
      assignedName = chosenMember.first_name + ' ' + chosenMember.last_name;
    } else {
      setTask({
        ...task,
        assigned_user_id: -1
      });
    }
  } else {
    assignedName = t('unknown');
  }

  const onSelectedAssignedMember = (memberIndex) => {
    setTask({
      ...task,
      assigned_user_id: memberIndex
    });
    setShowMembers(false);
  };

  const resetState = () => {
    setTask({
      title: '',
      content: '',
      deadline: '',
      reward: '',
      priority: '0',
      assigned_user_id: -1
    });
  };

  const handleOnSubmit = async () => {
    const newTask = {
      group_id: parseInt(groupId),
      title: task.title,
      content: task.content,
      assigned_user_id: parseInt(task.assigned_user_id),
      deadline: task.deadline.replace('T', ' '),
      reward: parseInt(task.reward),
      priority: parseInt(task.priority),
    };
    await addTask(newTask);
    resetState();
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={() => {
      resetState(); onClose();
    }}>
      <ModalOverlay />
      <ModalContent p='20px 10px'>
        <ModalHeader textAlign='center' fontSize='2xl'>
          {t('createTask')}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='5px' as='b' color='primary.300'>
            {t('title')}
          </Text>
          <Input
            placeholder={t('title')}
            value={task.title}
            onChange={(e) =>
              setTask({
                ...task,
                title: e.target.value,
            })}
            mb='20px'
          />

          <Text mb='5px' as='b' color='primary.300'>
            {t('description')}
          </Text>
          <Textarea
            placeholder={t('description')}
            value={task.content}
            onChange={(e) =>
              setTask({
                ...task,
                content: e.target.value,
            })}
            mb='20px'
          />

          <Text mb='5px' as='b' color='primary.300'>
            {t('assignTaskToOther')}
          </Text>

          <Box
            display='flex'
            flexDir='row'
            alignItems='center'
            justifyContent='space-between'
            m='10px 0 20px'
            className='task-view-assgn-ddl'
          >
            <Assigned name={assignedName} />
            <IconButton
              borderRadius="full"
              variant="ghost"
              size="lg"
              onClick={onShowMembers}
              icon={<IoCreateOutline/>}>
            </IconButton>
          </Box>

          <Text mb='5px' as='b' color='primary.300'>
            {t('priority')}
          </Text>
          <Select
            defaultValue={0}
            onChange={(e) =>
              setTask({
                ...task,
                priority: e.target.value,
            })}
            mb='20px'
          >
            <option value='0'>{t('priorityLow')}</option>
            <option value='1'>{t('priorityMedium')}</option>
            <option value='2'>{t('priorityHigh')}</option>
          </Select>

          <Text mb='5px' as='b' color='primary.300'>
            {t('reward')}
          </Text>
          <Select
            placeholder={t('selectRewardValue')}
            defaultValue={task.reward}
            onChange={(e) =>
              setTask({
                ...task,
                reward: e.target.value,
            })}
            mb='20px'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
            <option value='30'>30</option>
            <option value='35'>35</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
            <option value='75'>75</option>
            <option value='100'>100</option>
          </Select>

          <Text mb='5px' as='b' color='primary.300'>
            {t('deadline')}
          </Text>
          <Input
            placeholder={t('deadline')}
            type='date'
            min={new Date().toISOString().slice(0, 10)}
            value={task.deadline}
            onChange={(e) =>
              setTask({
                ...task,
                deadline: e.target.value,
            })}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!isDataValid}
            w='100%'
            colorScheme='primary'
            onClick={handleOnSubmit}
          >
            {t('save')}
          </Button>
        </ModalFooter>
      </ModalContent>
      <GroupMembers onClose={onHideMembers} open={showMembers} members={members} isCurrentUserOwner={false} isSelecting={true} selectMember={onSelectedAssignedMember}/>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      addTask: (task) => dispatch(addTask(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
