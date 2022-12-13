import React, { useState } from 'react';
import { IconButton, Box, Button, Flex, Input, Heading, Text } from '@chakra-ui/react';
import { SidebarWithHeader } from '../organisms/Navbar';
import { getUserGroups } from '../../state/actions/group';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { EditIcon } from '../../assets/icons';
import { Avatar } from '../atoms/Avatar';
import { IoCreateOutline } from 'react-icons/io5';

const Settings = ({ currentUser }) => {
    const show = false;
    const { t } = useTranslation();

    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);

    const startEditingUsername = () => setEditingUsername(true);
    const saveUsername = () => {
        setEditingUsername(false);
    };
    return (
        <SidebarWithHeader>
            <Flex gap={3} alignItems='center' mb={5}>
                <Heading fontSize='24' fontWeight='600'>
                    {t('settings')}
                </Heading>
            </Flex>
            <Box display="flex" flexDirection="column" gap={5}>
                <Box p='6' rounded='2xl' bg='white' maxW='md' display="flex" flexDirection="column" gap={6}>
                    <Text fontSize='xl' fontWeight='600'>Editeaza username</Text>
                    <Box display="flex" flexDirection="row" gap={6} alignItems='center' justifyContent='space-between'>
                        <Avatar name={currentUser.first_name + ' ' + currentUser.last_name} m='0' />
                        {!editingUsername && <Text fontSize='2xl' fontWeight='500'>{newUsername}</Text>}
                        {!editingUsername && <IconButton
                            borderRadius="full"
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<EditIcon size='16pt'/>}
                            onClick={startEditingUsername}>
                        </IconButton>}
                        {editingUsername &&
                        <Input
                            size='md'
                            borderRadius='xl'
                            value={newUsername}
                            onChange={(e) =>
                                setNewUsername(e.target.value)
                            }
                        />}
                        {editingUsername && <IconButton
                            borderRadius="full"
                            size="lg"
                            color="gray.700"
                            variant="ghost"
                            icon={<IoCreateOutline size='16pt'/>}
                            onClick={saveUsername}>
                        </IconButton>}
                    </Box>
                </Box>
                <Box p='6' rounded='2xl' bg='white' width="md" display="flex" flexDirection="column" gap={6}>
                    <Text fontSize='xl' fontWeight='600'>Editeaza parola</Text>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Current password'
                    />
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='New password'
                    />
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm new password'
                    />
                    <Button
                        isDisabled={false}
                        w='100%'
                        colorScheme='primary'
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
        getGroups: () => dispatch(getUserGroups()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
