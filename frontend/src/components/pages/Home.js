import React, { useState, useEffect } from 'react';
import { IconButton, Flex, Heading } from '@chakra-ui/react';
import GroupCreate from '../molecules/GroupCreate';
import { IoAddOutline } from 'react-icons/io5';
import { SidebarWithHeader } from '../organisms/Navbar';
import { getUserGroups } from '../../state/actions/group';
import {connect} from 'react-redux';
import GroupList from '../organisms/GroupList';
import { useTranslation } from 'react-i18next';

const Home = ({getGroups, groups}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  useEffect(() => {
    getGroups();
  }, []);
  const { t } = useTranslation();
  return (
    <SidebarWithHeader>
      <Flex gap={3} alignItems="center" mb={5}>
        <Heading fontSize="24" fontWeight="600">{t('myGroups')}</Heading>
        <IconButton
          borderRadius="full"
          colorScheme="primary"
          icon={<IoAddOutline/>}
          onClick={() => setOpen(true)}></IconButton>
      </Flex>

      <GroupCreate isOpen={open} close={onClose}/>
      {groups && <GroupList groups={groups}/>}
    </SidebarWithHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.group.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getGroups: () => dispatch(getUserGroups())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

