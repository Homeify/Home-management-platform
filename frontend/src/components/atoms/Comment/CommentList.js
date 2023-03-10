import React, { useState } from 'react';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { CommentItem } from '../../molecules/Comment';
import { MAX_COMMENTS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

const CommentList = ({ taskId, comments }) => {
    const { t } = useTranslation();
    const [showCommentModal, setShowCommentModal] = useState(false);

    const commentsToShow = [];
    for (let i = 0; i < comments.length; i++) {
        commentsToShow.push(comments[i]);
        if (commentsToShow.length === MAX_COMMENTS) break;
    }

    return (
        <>
            <Flex flexDir='column' p='0' gap={4}>
                {commentsToShow.map((comm, i) => (
                    <CommentItem key={i} comment={comm} taskId={taskId} />
                ))}
                {commentsToShow.length !== comments.length && (
                    <Button
                        colorScheme='primary'
                        onClick={() => setShowCommentModal(true)}
                    >
                        {t('showAll')}
                    </Button>
                )}
            </Flex>
            <Modal
                size='lg'
                isOpen={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent borderRadius='16' boxShadow='xl'>
                    <ModalHeader mt='2' pb='0'>
                        {t('comments')}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' size='md' />
                    <ModalBody py='20pt'>
                        <Flex flexDir='column' p='0' gap={4}>
                            {comments.map((comm, i) => (
                                <CommentItem key={i} comment={comm} taskId={taskId} />
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CommentList;
