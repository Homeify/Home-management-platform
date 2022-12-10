import React, { useState, useEffect } from 'react';
import { Avatar, AvatarGroup, Box, Divider, Text, IconButton } from '@chakra-ui/react';
import { IoTrashOutline, IoPencil, IoPersonAddOutline } from 'react-icons/io5';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../atoms';
import { getFormattedDate } from '../../utils/functions';
import ShareCode from '../molecules/ShareCode';
import GroupMembers from '../molecules/GroupMembers';
import { deleteGroup, getMembers } from '../../state/actions/group';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../utils/routes';

const GroupDetails = ({ group, readMembers, id, deleteGroup, currentUserId}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [showMembers, setShowMembers] = useState(false);
  const onHideMembers = () => setShowMembers(false);
  useEffect(() => {
    readMembers(parseInt(id));
  }, []);
  const ACTIONS = [
    {
      name: 'edit',
      icon: IoPencil,
      color: 'grey.500',
      action: () => {}
    },
    {
      name: 'delete',
      icon: IoTrashOutline,
      color: 'red.500',
      action: async () => {
        await deleteGroup(group.id);
        setTimeout(navigate(ROUTES.HOME), 0);
      }
    }
  ];
  const isCurrentUserOwner = group?.owner.id === currentUserId;
  return (
    <>
      { group && <> <Box p='6' rounded='2xl' bg='white' width="100%" display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="row" gap="3" alignItems="center" justifyContent="space-between">
          <Text fontSize='2xl' fontWeight='600'>{group.name}</Text>
          <Box gap={1} display="flex" flexDirection="row" alignItems="center">
            {
              ACTIONS.map((action, index) => (
                <IconButton
                  key={`group-action-${index}`}
                  borderRadius="full"
                  size="md"
                  color={action.color}
                  variant="ghost"
                  onClick={action.action}
                  icon={<action.icon/>}></IconButton>
              ))
            }
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" gap="10" mb="3">
          <InfoBox label={t('created-at')} info={getFormattedDate(new Date(group.date_created), t('allMonths'), true)}></InfoBox>
          <InfoBox label={t('created-by')} info={`${group.owner.first_name} ${group.owner.last_name}`}></InfoBox>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <InfoBox label={t('description')} info={group.description}></InfoBox>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems='center'
              onClick={() => setShowMembers(true)}>
              {group.members?.length > 0 && <AvatarGroup max={2}>
                {
                  group.members.map((member, i) => (
                    <Avatar height='36px' width='36px' key={`group-members-${group.id}-${i}`} name={member.username} src='' />
                  ))
                }
              </AvatarGroup> }
            </Box>
            <Box height='36px' px="2">
              <Divider borderColor="gray.300" orientation='vertical' />
            </Box>
            <IconButton
              onClick={() => setOpen(true)}
              borderRadius="full"
              size="md"
              color="gray.500"
              variant="solid"
              icon={<IoPersonAddOutline/>}></IconButton>
          </Box>
        </Box>
      </Box>
      <ShareCode code={group.code ?? '1234'} onClose={onClose} open={open}/>
      <GroupMembers onClose={onHideMembers} open={showMembers} members={group.members} isCurrentUserOwner={isCurrentUserOwner}/>
      </>}
    </>
  );
};

function mapStateToProps(state, ownProps) {
  const group = state.group.groups.find((item) => item.id === parseInt(ownProps.id));
  return {
    group,
    currentUserId: state.auth.currentUser?.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    readMembers: (groupId) => dispatch(getMembers(groupId)),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId))
    //   readTasks
  };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupDetails);

