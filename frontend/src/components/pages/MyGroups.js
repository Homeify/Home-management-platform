import React from 'react';
import { SidebarWithHeader } from '../organisms/Navbar';
import { TaskListAndView } from '../molecules/Task';
import TASKS from '../../utils/tasks';

export default function MyGroups() {
    return (
        <SidebarWithHeader>
            <TaskListAndView tasks={TASKS} />
        </SidebarWithHeader>
    );
}
