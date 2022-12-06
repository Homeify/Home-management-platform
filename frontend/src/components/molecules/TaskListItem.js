import React from 'react';
import { Box, Tag, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import '../../styles/tasks.scss';
import { Card } from '../atoms';
import {
    Deadline,
    HighPriority,
    LowPriority,
    MediumPriority,
} from '../../assets/icons';
import { getFormattedDate } from '../../utils/functions';

export default function TaskListItem({ item, selected }) {
    const { t } = useTranslation();
    const { title, priority, status, deadline } = item;
    const deadlineFormattedDate = getFormattedDate(
        deadline,
        t('allMonths'),
        false
    );

    return (
        <Card
            className={`task-li ${selected ? 'task-li-border' : ''}`}
            containerClassName='task-li-container'
        >
            {priority === 1 ? (
                <LowPriority />
            ) : priority === 2 ? (
                <MediumPriority />
            ) : (
                <HighPriority />
            )}
            <Text m='0 20px' flexGrow='1' as='b' fontSize='xl' w='150px'>
                {title}
            </Text>

            <Box display='flex' flexDir='row' alignItems='center'>
                <Deadline size='18pt' />
                <Text as='b' m='0 30px 0 10px' minW='60px'>
                    {deadlineFormattedDate}
                </Text>
            </Box>

            {/* <Avatar name={authorName} size='sm' /> */}

            <Tag
                size='md'
                variant='solid'
                w='60pt'
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontWeight='bold'
                textAlign='center'
                bgColor={
                    status === 0
                        ? 'grey.100'
                        : status === 1
                        ? 'blue.100'
                        : 'green.100'
                }
                color={
                    status === 0
                        ? 'grey.900'
                        : status === 1
                        ? 'blue.900'
                        : 'green.900'
                }
            >
                {status === 0
                    ? t('todo')
                    : status === 1
                    ? t('inprogress')
                    : t('done')}
            </Tag>
        </Card>
    );
}
