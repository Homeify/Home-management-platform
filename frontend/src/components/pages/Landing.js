import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import TaskList from '../atoms/TaskList';
import TASKS from '../../utils/tasks';

export default function Landing() {
    return (
        <div>
            <Link href='/home'>
                <Button colorScheme='primary'>Go to Home Page</Button>
            </Link>
            <TaskList tasks={TASKS} />
        </div>
    );
}
