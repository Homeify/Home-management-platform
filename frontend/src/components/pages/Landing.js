import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import { TaskListAndView } from '../molecules/Task';
import TASKS from '../../utils/tasks';

export default function Landing() {
  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <Link href='/home'>
        <Button colorScheme='primary'>Go to Home Page</Button>
      </Link>
      <TaskListAndView tasks={TASKS} />
    </div>
  );
}
