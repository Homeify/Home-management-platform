import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ArrowDownIcon, CloseIcon, DiamondIcon } from '../../../assets/icons';
import { getFormattedDate } from '../../../utils/functions';
import { AvatarWithPopover } from '../../atoms/Avatar';
import { CommentInput, CommentsHeader } from '../../atoms/Comment';
import { DetailsHeader, DetailsItem } from '../../atoms/Details';
import { PriorityIcon } from '../../atoms';
import { StatusTag, TaskMenu, Assigned, Deadline } from '../../atoms/Task';
import { EditTask } from './';
import { connect } from 'react-redux';
import {
    updateStatus,
    getTaskComments as getTaskCommentsAction,
    addCommentToTask,
} from '../../../state/actions/task';
import { CommentList } from '../../atoms/Comment';

function TaskView({
    task,
    updateStatusAction,
    groupId,
    deselectAll,
    getTaskComments,
    comments,
    postComment,
}) {
    if (!task) return <></>;
    const { t } = useTranslation();
    const {
        id,
        title,
        priority,
        assigned_user: assignedUser,
        deadline,
        posted,
        content,
        author,
        reward,
        status,
    } = task;
    const months = t('allMonths');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const deadlineFormattedDate = getFormattedDate(deadline, months, false);
    const createdFormattedDate = getFormattedDate(posted, months, true);
    const assignedName = assignedUser ? assignedUser : t('unknown');

    useEffect(() => {
        getTaskComments(id);
    }, []);

    const statusButtonBgColor =
        status === 0 ? 'grey.100' : status === 1 ? 'blue.100' : 'green.100';

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const showEditModal = () => {
        setEditModalVisible(true);
    };

    const handleUpdateStatus = (newStatus) => {
        updateStatusAction(parseInt(id), { status: newStatus });
    };

    const handlePostComment = () => {
        postComment(id, value);
        setValue('');
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
                <TaskMenu showEditModal={showEditModal} taskId={id} />
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
            <Text color='grey.500'>{content}</Text>

            {/* Details */}
            <DetailsHeader />

            <DetailsItem itemName={t('created')} info={createdFormattedDate}>
                <AvatarWithPopover name={author} />
            </DetailsItem>
            <DetailsItem itemName={t('reward')} info={reward}>
                <Box w='30px'>
                    <DiamondIcon size='32px' />
                </Box>
            </DetailsItem>
            <DetailsItem itemName={t('status')}>
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<ArrowDownIcon size='14pt' />}
                        size='sm'
                        bgColor={statusButtonBgColor}
                        _hover={{
                            bgColor: statusButtonBgColor,
                        }}
                        _active={{
                            bgColor: statusButtonBgColor,
                        }}
                    >
                        <StatusTag
                            status={status}
                            bgColor='transparent'
                            w='auto'
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleUpdateStatus('todo')}>
                            {t('todo')}
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleUpdateStatus('inprogress')}
                        >
                            {t('inprogress')}
                        </MenuItem>
                        <MenuItem onClick={() => handleUpdateStatus('done')}>
                            {t('done')}
                        </MenuItem>
                    </MenuList>
                </Menu>
            </DetailsItem>

            {/* Comments */}
            <CommentsHeader count={comments.length} />
            {/* Comments list */}
            {comments.length ? (
                <Box my='20px'>
                    <CommentList comments={comments} />
                </Box>
            ) : (
                <Box mb='20pt' p='20px 0'>
                    <Text color='grey.500'>{t('noComments')}</Text>
                </Box>
            )}
            <CommentInput
                value={value}
                handleInputChange={handleInputChange}
                onSubmit={handlePostComment}
            />

            {editModalVisible && (
                <EditTask
                    isVisible={editModalVisible}
                    setIsVisible={setEditModalVisible}
                    task={task}
                    groupId={groupId}
                />
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        status: state.task.status,
        comments: state.task.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        updateStatusAction: (taskId, newData) =>
            dispatch(updateStatus(taskId, newData)),
        getTaskComments: (taskId) => dispatch(getTaskCommentsAction(taskId)),
        postComment: (taskId, body) => dispatch(addCommentToTask(taskId, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
