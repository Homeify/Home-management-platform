import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    FormControl,
    Flex,
    Input,
    Text,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { joinGroup } from '../../../state/actions/group';

const GroupJoin = ({ isOpen, close, joinGroup }) => {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const isDataValid = true;
    const handleJoinGroup = async () => {
        await joinGroup(code);
        reset();
    };
    const reset = () => {
        setCode('');
        close();
    }
    return (
        <>
            <Modal size='sm' isOpen={isOpen} onClose={reset} isCentered={true}>
                <ModalOverlay />
                <ModalContent borderRadius='16' boxShadow='xl'>
                    <ModalHeader mt='2' pb='0'>
                        {t('group-join-title')}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' size='md' />
                    <ModalBody>
                        <Text fontSize='sm'>{t('group-join-subtitle')}</Text>
                        <Flex my={4} mt='4'>
                            <FormControl mr={2}>
                                <Input
                                    size='md'
                                    borderRadius='xl'
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                isDisabled={!isDataValid}
                                colorScheme='primary'
                                borderRadius='lg'
                                onClick={handleJoinGroup}
                            >
                                {t('join')}
                            </Button>
                        </Flex>
                    </ModalBody>
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
        joinGroup: (code) => dispatch(joinGroup(code)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupJoin);
