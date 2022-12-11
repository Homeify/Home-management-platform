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
// import { getFormattedDate } from '../../../utils/functions';
import GroupMembers from '../../molecules/Group/GroupMembers';
import Assigned from '../../atoms/Task/Assigned';

export default function CreateTask({ onClose, open, members }) {
  const { t } = useTranslation();
  // const months = t('allMonths');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reward, setReward] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedMember, setAssignedMember] = useState(-1);
  const [showMembers, setShowMembers] = useState(false);
  const onShowMembers = () => setShowMembers(true);
  const onHideMembers = () => setShowMembers(false);

  let assignedName;

  if (assignedMember !== -1) {
    const chosenMember = members.find((member) => {
      return member.id=assignedMember;
    });

    if (chosenMember) {
      assignedName = chosenMember.first_name + ' ' + chosenMember.last_name;
    } else {
      setAssignedMember(-1);
    }
  } else {
    assignedName = t('unknown');
  }

  const onSelectedAssignedMember = (memberIndex) => {
    setAssignedMember(memberIndex);
    setShowMembers(false);
  };

  const resetState = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignedMember(-1);
    setReward('');
    setPriority('');
  };

  const handleOnSubmit = () => {
    const data = {
        title: title,
        description: description,
        assignedMember: assignedMember,
        deadline: deadline.replace('T', ' '),
        reward: reward,
        priority: priority,
    };
    console.log(data);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb='20px'
          />

          <Text mb='5px' as='b' color='primary.300'>
            {t('description')}
          </Text>
          <Textarea
            placeholder={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            {/* <Assigned name={assignedName} />
            <Deadline date={deadlineFormattedDate} /> */}
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
            defaultValue={priority}
            onChange={(e) => setPriority(e.target.value)}
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
            defaultValue={reward}
            onChange={(e) => setReward(e.target.value)}
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
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
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
}
