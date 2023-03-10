import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { Avatar } from '../../atoms/Avatar';
import { getFormattedDate } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { DotsIcon, EditIcon, TrashIcon } from '../../../assets/icons';
import {
    deleteComment as deleteCommentAction,
    updateComment as updateCommentAction,
} from '../../../state/actions/task';

const CommentItem = ({
    taskId,
    comment,
    currentUser,
    deleteComment,
    updateComment,
}) => {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const { id: commentId, author, body, date_posted: datePosted } = comment;
    const { first_name: firstName, last_name: lastName, id } = author;
    const authorName = firstName + ' ' + lastName;
    const posted = new Date(datePosted);

    const handleDeleteComment = () => {
        deleteComment(taskId, commentId);
    };

    const handleEditComment = () => {
        updateComment(taskId, commentId, 'omgomg');
    };

    return (
        <Box bgColor='white.300' p='5' borderRadius='10' shadow='lg'>
            <Flex>
                <Avatar name={authorName} m='0' mr='3' w='30pt' h='30pt' />
                <Box w='100%'>
                    <Flex>
                        <Flex alignItems='center' gap={2} flexGrow='1'>
                            <Text as='b'>{authorName}</Text>
                            <Text fontSize='sm'>•</Text>
                            <Text fontSize='sm'>
                                {getFormattedDate(posted, t('allMonths'), true)}
                            </Text>
                        </Flex>
                        {currentUser && currentUser.id === id && (
                            <Menu alignSelf='flex-end'>
                                <MenuButton
                                    as={IconButton}
                                    icon={<DotsIcon size='14pt' />}
                                    variant='ghost'
                                    size='sm'
                                    borderRadius='full'
                                />
                                <MenuList>
                                    <MenuItem
                                        icon={<EditIcon size='14pt' />}
                                        onClick={handleEditComment}
                                    >
                                        {t('edit')}
                                    </MenuItem>
                                    <MenuItem
                                        icon={<TrashIcon size='14pt' />}
                                        color='red.300'
                                        onClick={handleDeleteComment}
                                    >
                                        {t('deleteComment')}
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </Flex>
                    <Text noOfLines={showAll ? '' : '3'} w='90%'>
                        {body}
                    </Text>
                    <Flex>
                        <Text
                            onClick={() => setShowAll(!showAll)}
                            fontSize='sm'
                            textDecoration='underline'
                            color='grey.500'
                            _hover={{ cursor: 'pointer' }}
                        >
                            {showAll ? t('showLess') : t('showMore')}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        deleteComment: (taskId, commentId) =>
            dispatch(deleteCommentAction(taskId, commentId)),
        updateComment: (taskId, commentId, body) =>
            dispatch(updateCommentAction(taskId, commentId, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
