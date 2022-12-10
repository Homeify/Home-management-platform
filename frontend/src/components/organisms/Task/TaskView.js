import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { CloseIcon, DiamondIcon } from '../../../assets/icons';
import { getFormattedDate } from '../../../utils/functions';
import { AvatarWithPopover } from '../../atoms/Avatar';
import { CommentInput, CommentsHeader } from '../../atoms/Comment';
import { DetailsHeader, DetailsItem } from '../../atoms/Details';
import { PriorityIcon } from '../../atoms';
import { StatusTag, TaskMenu, Assigned, Deadline } from '../../atoms/Task';
import { EditTask } from './';

export default function TaskView({ task, deselectAll }) {
    if (!task) return <></>;
    const { t } = useTranslation();
    const {
        title,
        priority,
        assigned,
        deadline,
        created,
        description,
        authorName,
        reward,
        status,
    } = task;
    const months = t('allMonths');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const deadlineFormattedDate = getFormattedDate(deadline, months, false);
    const createdFormattedDate = getFormattedDate(created, months, true);
    const assignedName = assigned ? assigned : t('unknown');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const showEditModal = () => {
        setEditModalVisible(true);
    };

    return (
        <>
            {/* Card title */}
            <Box display='flex' flexDir='row' alignItems='center'>
                <Text fontSize='2xl' as='b' mr='20px' maxW='80%'>
                    {title}
                </Text>
                <Box flexGrow='1'>
                    <PriorityIcon priority={priority} />
                </Box>
                <TaskMenu showEditModal={showEditModal} />
                <IconButton
                    onClick={deselectAll}
                    icon={<CloseIcon />}
                    variant='ghost'
                    borderRadius='full'
                />
            </Box>

            {/* Assigned and deadline */}
            <Box
                display='flex'
                flexDir='row'
                alignItems='center'
                justifyContent='space-between'
                m='20px 0'
                className='task-view-assgn-ddl'
            >
                <Assigned name={assignedName} />
                <Deadline date={deadlineFormattedDate} />
            </Box>

            {/* Description */}
            <Text color='grey.500'>{description}</Text>

            {/* Details */}
            <DetailsHeader />

            <DetailsItem itemName={t('created')} info={createdFormattedDate}>
                <AvatarWithPopover name={authorName} />
            </DetailsItem>
            <DetailsItem itemName={t('reward')} info={reward}>
                <Box w='30px'>
                    <DiamondIcon size='32px' />
                </Box>
            </DetailsItem>
            <DetailsItem itemName={t('status')}>
                <StatusTag status={status} />
            </DetailsItem>

            {/* Comments */}
            <CommentsHeader count={0} />
            {/* Comments list */}
            <Box mb='20pt' p='20px 0'>
                <Text color='grey.500'>{t('noComments')}</Text>
            </Box>
            <CommentInput value={value} handleInputChange={handleInputChange} />

            {editModalVisible && (
                <EditTask
                    isVisible={editModalVisible}
                    setIsVisible={setEditModalVisible}
                    task={task}
                />
            )}
        </>
    );
}
