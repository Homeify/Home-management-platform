import React from 'react';
import { Flex } from '@chakra-ui/react';
import { CommentItem } from '../../molecules/Comment';

const CommentList = ({ comments }) => {
    return (
        <Flex flexDir='column' p='0' gap={4}>
            {comments.map((comm, i) => (
                <CommentItem key={i} comment={comm} />
            ))}
        </Flex>
    );
};

export default CommentList;
