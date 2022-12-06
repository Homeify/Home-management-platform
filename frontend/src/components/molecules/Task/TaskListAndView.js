import {
    Box,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import '../../../styles/tasks.scss';
import { Card } from '../../atoms';
import { TaskList } from '../../atoms/Task';
import TaskView from '../../organisms/TaskView';

export default function TaskListAndView({ tasks }) {
    const [selectedTask, setSelectedTask] = useState();
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const { onClose } = useDisclosure();

    const handleResize = () => {
        setWinWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const deselectAll = () => {
        setSelectedTask(undefined);
    };

    return (
        <Box display='flex' flexDir='row'>
            <Box flexGrow='1' height='100%'>
                <TaskList
                    tasks={tasks}
                    selectTask={setSelectedTask}
                    selectedTask={selectedTask}
                />
            </Box>

            {selectedTask !== undefined &&
                (winWidth > 1600 ? (
                    <Box w='40%' p='10px'>
                        <Card
                            className='task-details'
                            containerClassName='task-details-container'
                        >
                            <TaskView
                                task={tasks[selectedTask]}
                                deselectAll={deselectAll}
                            />
                        </Card>
                    </Box>
                ) : (
                    <Modal isOpen={true} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent p='20px 10px'>
                            <ModalBody>
                                <TaskView
                                    task={tasks[selectedTask]}
                                    deselectAll={deselectAll}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                ))}
        </Box>
    );
}
