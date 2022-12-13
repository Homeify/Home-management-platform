import React, { useState } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getFormattedDate } from '../../../utils/functions';
import { connect } from 'react-redux';
import { updateTask as updateTaskAction } from '../../../state/actions/task';

function EditTask({ isVisible, setIsVisible, task, groupId, updateTask }) {
    if (!task) return <></>;

    const { t } = useTranslation();
    const months = t('allMonths');
    const { id, title, content, deadline, priority, reward } = task;
    const [newTitle, setNewTitle] = useState(title);
    const [newDesc, setNewDesc] = useState(content);
    const [newPriority, setNewPriority] = useState(priority);
    const [newDeadline, setNewDeadline] = useState(
        getFormattedDate(deadline, months, true, true)
    );
    const [newReward, setNewReward] = useState(reward);

    const handleOnSubmit = () => {
        const newData = {
            title: newTitle,
            content: newDesc,
            deadline: newDeadline.replace('T', ' '),
            reward: newReward,
            priority: newPriority,
        };
        updateTask(parseInt(id), newData);
        setIsVisible(false);
    };

    return (
        <Modal isOpen={isVisible} onClose={() => setIsVisible(false)}>
            <ModalOverlay />
            <ModalContent p='20px 10px'>
                <ModalHeader textAlign='center' fontSize='2xl'>
                    {t('edit')}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb='5px' as='b' color='primary.300'>
                        {t('title')}
                    </Text>
                    <Input
                        placeholder={t('title')}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        mb='20px'
                    />

                    <Text mb='5px' as='b' color='primary.300'>
                        {t('description')}
                    </Text>
                    <Textarea
                        placeholder={t('description')}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        mb='20px'
                    />

                    <Text mb='5px' as='b' color='primary.300'>
                        {t('priority')}
                    </Text>
                    <Select
                        defaultValue={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        mb='20px'
                    >
                        <option value='0'>{t('priorityLow')}</option>
                        <option value='1'>{t('priorityMedium')}</option>
                        <option value='2'>{t('priorityHigh')}</option>
                    </Select>

                    <Text mb='5px' as='b' color='primary.300'>
                        {t('reward')}
                    </Text>
                    <Select
                        placeholder={t('selectRewardValue')}
                        defaultValue={newReward}
                        onChange={(e) => setNewReward(e.target.value)}
                        mb='20px'
                    >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                        <option value='30'>30</option>
                        <option value='35'>35</option>
                        <option value='40'>40</option>
                        <option value='50'>50</option>
                        <option value='75'>75</option>
                        <option value='100'>100</option>
                    </Select>

                    <Text mb='5px' as='b' color='primary.300'>
                        {t('deadline')}
                    </Text>
                    <Input
                        placeholder={t('deadline')}
                        type='date'
                        min={new Date().toISOString().slice(0, 10)}
                        value={newDeadline}
                        onChange={(e) => setNewDeadline(e.target.value)}
                    />
                    {/* TODO: edit task color and emoji */}
                </ModalBody>
                <ModalFooter>
                    <Button
                        w='100%'
                        colorScheme='primary'
                        onClick={handleOnSubmit}
                    >
                        {t('save')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        updateTask: (taskId, newData) =>
            dispatch(updateTaskAction(taskId, newData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
