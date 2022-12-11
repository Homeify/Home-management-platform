import React from 'react';
import { Badge, Flex, Text, IconButton } from '@chakra-ui/react';
import { PersonRemoveIcon } from '../../../assets/icons';
import { Avatar } from '../../atoms/Avatar';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { removeUserFromGroup } from '../../../state/actions/group';

const MembersListItem = ({ member, canRemove, groupId, removeUserFromGroup }) => {
  const { t } = useTranslation();
  const removeMember = () => {
    removeUserFromGroup({groupId, userId: member.id});
  };
  const showRemoveAction = member.owner === false && canRemove;
  return (
    <Flex direction="row" gap={3} alignItems="center">
      <Avatar width="42px" height="42px" name={member.first_name + ' ' + member.last_name} src='' m='0' />
      <Flex direction="column" grow="1">
        <Flex direction="row" alignItems="center">
          <Text fontWeight='600'>
            {`${member.first_name} ${member.last_name}`}
          </Text>
          { member.owner && <Badge ml='2' bgColor="green.500" px="2" fontWeight="600" textTransform="capitalize" color="white" borderRadius="2xl">
            {t('owner')}
          </Badge> }
        </Flex>
        <Text fontSize='sm'>{member.username}</Text>
      </Flex>
      {showRemoveAction && <IconButton
        borderRadius="full"
        colorScheme="red"
        variant="ghost"
        onClick={removeMember}
        icon={<PersonRemoveIcon size='21px'/>}></IconButton> }
    </Flex>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    removeUserFromGroup: ({groupId, userId}) => dispatch(removeUserFromGroup({groupId, userId}))
  };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MembersListItem);
