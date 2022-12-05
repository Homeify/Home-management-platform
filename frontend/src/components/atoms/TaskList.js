import React from 'react';
import TaskListItem from '../molecules/TaskListItem';

export default function TaskList({ tasks }) {
    return (
        <>
            {tasks.map((task) => (
                <TaskListItem item={task} />
            ))}
        </>
    );
}
