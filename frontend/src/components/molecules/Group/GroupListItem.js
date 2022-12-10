import React, { useState } from 'react';
import {
  AvatarGroup,
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react';
import ROUTES from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGroup } from '../../../state/actions/group';
import { ShareCode } from './';
import { useTranslation } from 'react-i18next';
import { DotsIcon, PersonAddIcon, TrashIcon } from '../../../assets/icons';
import { Avatar } from '../../atoms/Avatar';

const GroupListItem = ({ deleteGroup, group}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const openGroup = () => navigate(`${ROUTES.GROUP}/${group.id}`);
  const openGroupOptions = (e) => {
    e.stopPropagation();
  };
  const [showInvite, setShowInvite] = useState(false);
  const hideInvite = () => setShowInvite(false);

  const ACTIONS = [
    {
      name: 'invite',
      icon: PersonAddIcon,
      color: 'grey.700',
      action: (e) => {
        e.stopPropagation();
        setShowInvite(true);
      }
    },
    {
      name: 'delete',
      icon: TrashIcon,
      color: 'red.500',
      action: async (e) => {
        e.stopPropagation();
        await deleteGroup(group.id);
        setTimeout(navigate(ROUTES.HOME), 0);
      }
    }
  ];
  return (
    <Box cursor="pointer" p='6' rounded='2xl' bg='white' w={250} h={250} display="flex" flexDirection="column" gap={3}
      onClick={openGroup}>
      <Text fontSize='xl' fontWeight='600'>{group.name}</Text>
      <Text fontSize='sm' fontWeight='500'>{group.description}</Text>
      <Box flexGrow={1}/>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems='center'>
        {group.members?.length > 0 && <AvatarGroup max={2}>
          {
            group.members.map((member, i) => (
              <Avatar height='36px' width='36px' key={`group-members-${group.id}-${i}`} name={member.first_name + ' ' + member.last_name} src='' m='0'/>
            ))
          }
        </AvatarGroup> }
        <Popover>
          <PopoverTrigger>
            <IconButton
              borderRadius="full"
              variant="ghost"
              onClick={openGroupOptions}
              icon={<DotsIcon size='14pt'/>}></IconButton>
          </PopoverTrigger>
          <PopoverContent width="200px" borderRadius="md" style={{overflow: 'hidden'}}>
            <PopoverBody bgColor="white" p="0">
              <Flex direction="column">
                {
                  ACTIONS.map((action, index) => (
                    <Flex cursor="pointer" key={`group-action-${index}`} alignItems="center">
                      <Button
                        justifyContent="start"
                        px={5}
                        py={1}
                        size="md"
                        width="100%"
                        borderRadius="none"
                        color={action.color}
                        variant="ghost"
                        onClick={action.action}
                        leftIcon={<action.icon size='12pt'/>}><Text fontSize="14" fontWeight="400">{t(action.name)}</Text></Button>
                    </Flex>
                  ))
                }
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <ShareCode code={group.code ?? '1234'} onClose={hideInvite} open={showInvite}/>
    </Box>
  );
};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId))
  };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupListItem);
