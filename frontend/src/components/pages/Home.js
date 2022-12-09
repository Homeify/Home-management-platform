import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Link } from '@chakra-ui/react';
import GroupCreate from '../molecules/GroupCreate';
import { IoAddOutline } from 'react-icons/io5';
import SignOutButton from '../atoms/SignOutButton';
import { getUserGroups } from '../../state/actions/group';
import {connect} from 'react-redux';
import GroupList from '../organisms/GroupList';

const Home = ({getGroups, groups}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <div>
      <Link href='/'>
        <Button colorScheme='primary'>Go to Landing Page</Button>
      </Link>
      <IconButton
        borderRadius="full"
        colorScheme="primary"
        icon={<IoAddOutline/>}
        onClick={() => setOpen(true)}></IconButton>
      <GroupCreate isOpen={open} close={onClose}/>
      <Box maxW="75px"><SignOutButton/></Box>
      {groups && <GroupList groups={groups}/>}
    </div>
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

