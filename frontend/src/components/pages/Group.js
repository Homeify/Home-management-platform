import React, { useEffect, useState } from 'react';
import { SidebarWithHeader } from '../organisms/Navbar';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/tasks.scss';
import { useWindowWidth } from '../../hooks';
import { Card } from '../atoms';
import { TaskList } from '../atoms/Task';
import { TaskView } from '../organisms/Task';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { GroupDetails } from '../organisms/Group';
import { SearchAndFilter } from '../organisms/SearchAndFilter';
import { getGroupTasks as getGroupTasksAction } from '../../state/actions/task.js';

const Group = ({ tasks, readTasks, userId }) => {
  const params = useParams();
  const [selectedTask, setSelectedTask] = useState();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { onClose } = useDisclosure();
  const { isSmall } = useWindowWidth();
  const groupId = params.uid;

  const deselectAll = () => {
    setSelectedTask(undefined);
  };

  const setNewFilteredTasks = (tsks) => {
    setFilteredTasks(tsks);
    if (!tsks || tsks.length === 0) {
      setSelectedTask();
    } else if (!isSmall) {
      setSelectedTask(0);
    }
  };

  useEffect(() => {
    if (!isSmall) {
      setSelectedTask(0);
    }
    readTasks(groupId);
  }, []);

  useEffect(() => {
    setNewFilteredTasks(tasks);
  }, [tasks]);

  return (
    <SidebarWithHeader userId={userId} groupId={groupId}>
      <Box display='flex' flexDir='row'>
        <Box flexGrow='1' height='100%'>
          <GroupDetails id={groupId} />
          <SearchAndFilter
            tasks={tasks}
            setTasks={setNewFilteredTasks}
          />
          <TaskList
            tasks={filteredTasks}
            selectTask={setSelectedTask}
            selectedTask={selectedTask}
          />
        </Box>

        {selectedTask !== undefined &&
                    (!isSmall ? (
                        <Box w='40%' px='10px'>
                          <Card
                            className='task-details'
                            containerClassName='task-details-container'
                          >
                            <TaskView
                              task={filteredTasks[selectedTask]}
                              deselectAll={deselectAll}
                              groupId={groupId}
                            />
                          </Card>
                        </Box>
                    ) : (
                        <Modal isOpen={true} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent p='20px 10px'>
                            <ModalBody>
                              <TaskView
                                task={filteredTasks[selectedTask]}
                                deselectAll={deselectAll}
                                groupId={groupId}
                              />
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                    ))}
      </Box>
    </SidebarWithHeader>
  );
};

const mapStateToProps = (state) => {
  const newTasks = state.task.tasks ? state.task.tasks.map((item) => ({
    ...item,
    deadline: new Date(item.deadline),
    posted: new Date(item.posted)})) : [];
    
  return {
    tasks: newTasks,
    userId: state.auth.currentUser.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    readTasks: (groupId) => dispatch(getGroupTasksAction(groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
