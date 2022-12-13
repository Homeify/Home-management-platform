import React, { useState, useEffect } from 'react';
import { IconButton, Flex, Heading } from '@chakra-ui/react';
import { SidebarWithHeader } from '../organisms/Navbar';
import { getUserGroups } from '../../state/actions/group';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusIcon, KeypadIcon } from '../../assets/icons';
import { GroupList } from '../organisms/Group';
import { GroupCreate, GroupJoin } from '../molecules/Group';

const Home = ({ getGroups, groups }) => {
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const onCloseGroupCreate = () => setOpenCreateGroup(false);
    const [openJoinGroup, setOpenJoinGroup] = useState(false);
    const onCloseJoinGroup = () => setOpenJoinGroup(false);
    useEffect(() => {
        getGroups();
    }, []);
    const { t } = useTranslation();
    return (
        <SidebarWithHeader>
            <Flex gap={3} alignItems='center' mb={5}>
                <Heading fontSize='24' fontWeight='600'>
                    {t('myGroups')}
                </Heading>
                <IconButton
                    size='sm'
                    borderRadius='full'
                    colorScheme='primary'
                    icon={<PlusIcon size='14pt' />}
                    onClick={() => setOpenCreateGroup(true)}
                ></IconButton>
                <IconButton
                    size='sm'
                    borderRadius='full'
                    colorScheme='primary'
                    icon={<KeypadIcon size='14pt' />}
                    onClick={() => setOpenJoinGroup(true)}
                ></IconButton>
            </Flex>

            <GroupCreate isOpen={openCreateGroup} close={onCloseGroupCreate} />
            <GroupJoin isOpen={openJoinGroup} close={onCloseJoinGroup} />
            {groups && <GroupList groups={groups} />}
        </SidebarWithHeader>
    );
};

const mapStateToProps = (state) => {
    return {
        groups: state.group.groups,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        getGroups: () => dispatch(getUserGroups()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
