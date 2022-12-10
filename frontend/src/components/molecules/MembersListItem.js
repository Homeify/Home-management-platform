import React from 'react';
import { Avatar, Badge, Flex, Text, IconButton } from '@chakra-ui/react';
import { IoPersonRemoveOutline } from 'react-icons/io5';

export default function MemberListItem({ member, canRemove }) {
  const removeMember = () => {};
  const showRemoveAction = member.owner === false && canRemove;
  return (
    <Flex direction="row" gap={3} alignItems="center">
      <Avatar size="md" name={member.username} src='' />
      <Flex direction="column" grow="1">
        <Flex direction="row" alignItems="center">
          <Text fontWeight='600'>
            {`${member.first_name} ${member.last_name}`}
          </Text>
          { member.owner && <Badge ml='2' bgColor="green.500" px="2" fontWeight="600" textTransform="capitalize" color="white" borderRadius="2xl">
           Owner
          </Badge> }
        </Flex>
        <Text fontSize='sm'>{member.username}</Text>
      </Flex>
      {showRemoveAction && <IconButton
        borderRadius="full"
        colorScheme="red"
        variant="ghost"
        onClick={removeMember}
        icon={<IoPersonRemoveOutline/>}></IconButton> }
    </Flex>
  );
}
