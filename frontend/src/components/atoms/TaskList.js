import { Box } from '@chakra-ui/react';
import React from 'react';
import TaskListItem from '../molecules/TaskListItem';

export default function TaskList({ tasks, selectTask, selectedTask }) {
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
        </>
    );
}
