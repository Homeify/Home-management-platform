import React from 'react';
import { Avatar, Tag, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import '../../styles/taskListItem.scss';
import { Card } from '../atoms';
import { HighPriority, LowPriority, MediumPriority } from '../../assets/icons';

export default function TaskListItem({ item }) {
    const { t } = useTranslation();
    const { title, priority, authorName, status } = item;

    return (
        <Card className='task-li' containerClassName='task-li-container'>
            {priority === 1 ? (
                <LowPriority />
            ) : priority === 2 ? (
                <MediumPriority />
            ) : (
                <HighPriority />
            )}
            <Text margin='0 20px' flexGrow='1' as='b' fontSize='2xl'>
                {title}
            </Text>
            <Avatar
                name={authorName}
                size='sm'
                fontWeight='bold'
                margin='0 20px'
                color='white.300'
            />
            <Tag
                size='lg'
                variant='solid'
                w='70pt'
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
