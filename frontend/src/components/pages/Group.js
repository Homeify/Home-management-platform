import React, { useEffect, useState } from 'react';
import { SidebarWithHeader } from '../organisms/Navbar';
import TASKS from '../../utils/tasks';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import GroupDetails from '../organisms/GroupDetails';
import '../../styles/tasks.scss';
import useWindowWidth from '../../hooks/useWindowWidth';
import { Card } from '../atoms';
import { TaskList } from '../atoms/Task';
import { TaskView } from '../organisms/Task';
import { Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure} from '@chakra-ui/react';

const Group = ({}) => {
  const params = useParams();
  const [selectedTask, setSelectedTask] = useState();
  const { onClose } = useDisclosure();
  const { isSmall } = useWindowWidth();
  const tasks = TASKS;
  const deselectAll = () => {
    setSelectedTask(undefined);
  };
  useEffect(() => {
    if (!isSmall) {
      setSelectedTask(0);
    }
    // FIX ME
    //   readTasks(params.uid);
  }, []);
  return (
    <SidebarWithHeader>
      <Box display='flex' flexDir='row'>
        <Box flexGrow='1' height='100%'>
          <GroupDetails id={params.uid}/>
          <TaskList
            tasks={tasks}
            selectTask={setSelectedTask}
            selectedTask={selectedTask}
          />
        </Box>

        {selectedTask !== undefined &&
                    (!isSmall ? (
                        <Box w='40%' px="10px">
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
    </SidebarWithHeader>
  );
};

function mapStateToProps(state, ownProps) {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //   readTasks
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Group);
