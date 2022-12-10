import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskListItem } from './';

export default function TaskList({ tasks, selectTask, selectedTask }) {
    const { t } = useTranslation();
    return (
        <>
            {tasks.map((task, i) => (
                <Box key={i} onClick={() => selectTask(i)} m='10px 0'>
                    <TaskListItem
                        item={task}
                        selected={selectedTask === i ? true : false}
                    />
                </Box>
            ))}
            {(!tasks || tasks.length === 0) && (
                <Flex>
                    <Text
                        fontSize='3xl'
                        color='primary.100'
                        as='b'
                        w='100%'
                        textAlign='center'
                    >
                        {t('noTask')}
                    </Text>
                </Flex>
            )}
        </>
    );
}
