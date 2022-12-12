import React, { useState, useEffect } from 'react';
import { AvatarGroup, Box, Divider, Text, IconButton } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../atoms';
import { getFormattedDate } from '../../../utils/functions';
import {
    deleteGroup as deleteGroupAction,
    getMembers as getMembersAction
} from '../../../state/actions/group';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../utils/routes';
import { EditIcon, PersonAddIcon, TrashIcon } from '../../../assets/icons';
import { Avatar } from '../../atoms/Avatar';
import { GroupMembers, GroupEdit, ShareCode } from '../../molecules/Group';

const GroupDetails = ({ group, readMembers, id, deleteGroup, currentUserId}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [showMembers, setShowMembers] = useState(false);
  const onHideMembers = () => setShowMembers(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const onHideEditGroup = () => setShowEditGroup(false);

  useEffect(() => {
    readMembers(parseInt(id));
  }, []);

  const isCurrentUserOwner = group?.owner.id === currentUserId;

  const ACTIONS = [
    {
      name: 'edit',
      icon: EditIcon,
      color: 'grey.500',
      action: () => {
        setShowEditGroup(true);
      },
      isVisible: isCurrentUserOwner
    },
    {
      name: 'delete',
      icon: TrashIcon,
      color: 'red.500',
      action: async () => {
        await deleteGroup(group.id);
        setTimeout(navigate(ROUTES.HOME), 0);
      },
      isVisible: isCurrentUserOwner
    }
  ];
  return (
    <>
      { group && <> <Box p='6' rounded='2xl' bg='white' width="100%" display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="row" gap="3" alignItems="center" justifyContent="space-between">
          <Text fontSize='2xl' fontWeight='600'>{group.name}</Text>
          <Box gap={1} display="flex" flexDirection="row" alignItems="center">
            {
              ACTIONS.map((action, index) => (
                action.isVisible && <IconButton
                  key={`group-action-${index}`}
                  borderRadius="full"
                  size="md"
                  color={action.color}
                  variant="ghost"
                  onClick={action.action}
                  icon={<action.icon size='14pt'/>}></IconButton>
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
                    <Avatar ml="0" height='42px' width='42px' key={`group-members-${group.id}-${i}`} name={member.first_name + ' ' + member.last_name} src='' />
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
              icon={<PersonAddIcon size='14pt'/>}></IconButton>
          </Box>
        </Box>
      </Box>
      <ShareCode code={group.code ?? '1234'} onClose={onClose} open={open}/>
      <GroupMembers groupId={group.id} onClose={onHideMembers} open={showMembers} members={group.members} isCurrentUserOwner={isCurrentUserOwner}/>
      <GroupEdit isOpen={showEditGroup} onClose={onHideEditGroup} group={group}/>
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
    readMembers: (groupId) => dispatch(getMembersAction(groupId)),
    deleteGroup: (groupId) => dispatch(deleteGroupAction(groupId))
    //   readTasks
  };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupDetails);

