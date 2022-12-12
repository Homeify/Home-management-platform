import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Textarea,
    Stack,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { editGroup } from '../../../state/actions/group';

const GroupEdit = ({ isOpen, onClose, group, editGroup }) => {
    if (!group) return <></>;

    const { t } = useTranslation();
    const { name, description, id } = group;
    const [editedGroup, setEditedGroup] = useState({
        id: id,
        name: name,
        description: description
    });
    const isDataValid = editedGroup.name.length >= 3 && editedGroup.description.length >= 3;

    const handleGroupCreate = async () => {
        await editGroup(editedGroup);
        onClose();
    };

    const resetState = async () => {
        setEditedGroup({
            id: id,
            name: name,
            description: description
        });
        onClose();
    };

    return (
        <>
            <Modal size='lg' isOpen={isOpen} onClose={resetState} isCentered={true}>
                <ModalOverlay />
                <ModalContent borderRadius='16' boxShadow='xl'>
                    <ModalHeader mt='2' pb='0'>
                        {t('group-edit-title')}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' size='md' />
                    <ModalBody>
                        <Stack gap='6' mt='8'>
                            <FormControl id='name' isRequired>
                                <FormLabel fontSize={'md'} color='gray.600'>
                                    {t('group-name-label')}
                                </FormLabel>
                                <Input
                                    size='md'
                                    borderRadius='xl'
                                    value={editedGroup.name}
                                    onChange={(e) =>
                                        setEditedGroup({
                                            ...editedGroup,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl id='description' isRequired>
                                <FormLabel fontSize={'md'} color='gray.600'>
                                    {t('group-description-label')}
                                </FormLabel>
                                <Textarea
                                    value={editedGroup.description}
                                    borderRadius='xl'
                                    onChange={(e) =>
                                        setEditedGroup({
                                            ...editedGroup,
                                            description: e.target.value,
                                        })
                                    }
                                    size='md'
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            {t('dismiss')}
                        </Button>
                        <Button
                            isDisabled={!isDataValid}
                            colorScheme='primary'
                            borderRadius='lg'
                            onClick={handleGroupCreate}
                        >
                            {t('edit')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        editGroup: (group) => dispatch(editGroup(group)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupEdit);
