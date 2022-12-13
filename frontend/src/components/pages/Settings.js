import React, { useState } from 'react';
import { IconButton, Box, Button, Flex, Input, InputGroup, InputRightElement, Heading, Text } from '@chakra-ui/react';
import { SidebarWithHeader } from '../organisms/Navbar';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { EditIcon } from '../../assets/icons';
import { Avatar } from '../atoms/Avatar';
import { IoCreateOutline, IoEyeSharp } from 'react-icons/io5';
import { updateUsername, updateEmail, updatePassword } from '../../state/actions/user';

const Settings = ({ currentUser, updateUsername, updateEmail, updatePassword }) => {
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);

    const startEditingUsername = () => setEditingUsername(true);
    const saveUsername = async () => {
        await updateUsername(newUsername);
        setEditingUsername(false);
    };

    const [editingEmail, setEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState(currentUser.email);

    const startEditingEmail = () => setEditingEmail(true);
    const saveEmail = async () => {
        await updateEmail(newEmail);
        setEditingEmail(false);
    };

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const savePassword = async () => {
        console.log(password1, password2);
        await updatePassword(password1, password2);
        setPassword1('');
        setPassword2('');
    };

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const saveUsernameDisabled = newUsername.length < 4;
    const savePasswordDisabled = password1.length < 5 || password1 !== password2;
    const saveEmailDisabled = !emailRegex.test(newEmail);

    return (
        <SidebarWithHeader>
            <Flex gap={3} alignItems='center' mb={5}>
                <Heading fontSize='24' fontWeight='600'>
                    {t('settings')}
                </Heading>
            </Flex>
            <Box display="flex" flexDirection="column" gap={5}>
                <Box p='6' rounded='2xl' bg='white' maxW='md' display="flex" flexDirection="column" gap={6}>
                    <Text fontSize='xl' fontWeight='600'>{t('edit-username-title')}</Text>
                    <Box display="flex" flexDirection="row" gap={6} alignItems='center' justifyContent='space-between'>
                        <Avatar name={currentUser.first_name + ' ' + currentUser.last_name} m='0' />
                        {!editingUsername && <>
                        <Box borderWidth='2px' borderColor='gray.200' width='100%' borderRadius='lg' display="flex"justifyContent='center'>
                            <Text fontSize='2xl' fontWeight='500'>{newUsername}</Text>
                        </Box>
                        <IconButton
                            borderRadius="full"
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<EditIcon size='16pt'/>}
                            onClick={startEditingUsername}>
                        </IconButton>
                        </>}
                        {editingUsername && <>
                        <Input
                            size='md'
                            borderRadius='xl'
                            value={newUsername}
                            onChange={(e) =>
                                setNewUsername(e.target.value)
                            }
                        />
                        <IconButton
                            borderRadius="full"
                            disabled={saveUsernameDisabled}
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<IoCreateOutline size='16pt'/>}
                            onClick={saveUsername}>
                        </IconButton>
                        </>}
                    </Box>
                </Box>
                <Box p='6' rounded='2xl' bg='white' maxW='md' display="flex" flexDirection="column" gap={6}>
                    <Text fontSize='xl' fontWeight='600'>{t('edit-email-title')}</Text>
                    <Box display="flex" flexDirection="row" gap={6} alignItems='center' justifyContent='space-between'>
                        {!editingEmail && <>
                        <Box borderWidth='2px' borderColor='gray.200' width='100%' borderRadius='lg' display="flex"justifyContent='center'>
                            <Text fontSize='2xl' fontWeight='500'>{newEmail}</Text>
                        </Box>
                        <IconButton
                            borderRadius="full"
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<EditIcon size='16pt'/>}
                            onClick={startEditingEmail}>
                        </IconButton>
                        </>}
                        {editingEmail && <>
                        <Input
                            size='md'
                            borderRadius='xl'
                            value={newEmail}
                            onChange={(e) =>
                                setNewEmail(e.target.value)
                            }
                        />
                        <IconButton
                            borderRadius="full"
                            disabled={saveEmailDisabled}
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<IoCreateOutline size='16pt'/>}
                            onClick={saveEmail}>
                        </IconButton>
                        </>}
                    </Box>
                </Box>
                <Box p='6' rounded='2xl' bg='white' width="md" display="flex" flexDirection="column" gap={6}>
                    <Text fontSize='xl' fontWeight='600'>{t('edit-password-title')}</Text>
                    <InputGroup>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder={t('new-password')}
                            value={password1}
                            onChange={(e) =>
                                setPassword1(e.target.value)
                            }
                        />
                        <InputRightElement width='4.5rem'>
                            <IconButton
                                size='sm'
                                color="gray.600"
                                borderRadius="full"
                                variant="ghost"
                                icon={<IoEyeSharp size='16pt'/>}
                                onClick={handleShow}
                            />
                        </InputRightElement>
                    </InputGroup>

                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder={t('confirm-new-password')}
                        value={password2}
                        onChange={(e) =>
                            setPassword2(e.target.value)
                        }
                    />
                    <Button
                        isDisabled={savePasswordDisabled}
                        w='100%'
                        colorScheme='primary'
                        onClick={savePassword}
                        >
                        {t('save')}
                    </Button>
                </Box>
            </Box>
        </SidebarWithHeader>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        updateUsername: (username) => dispatch(updateUsername(username)),
        updateEmail: (email) => dispatch(updateEmail(email)),
        updatePassword: (password1, password2) => dispatch(updatePassword(password1, password2))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
