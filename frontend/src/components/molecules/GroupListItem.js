import React from 'react';
import { Avatar, AvatarGroup, Box, Text, IconButton } from '@chakra-ui/react';
import { IoEllipsisHorizontal } from 'react-icons/io5';

export default function GroupListItem({ group}) {
  return (
    <Box p='6' rounded='2xl' bg='white' w={250} h={250} display="flex" flexDirection="column" gap={3}>
      <Text fontSize='xl' fontWeight='600'>{group.name}</Text>
      <Text fontSize='sm' fontWeight='500'>{group.description}</Text>
      <Box flexGrow={1}/>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems='center'>
        {group.members?.length > 0 && <AvatarGroup max={2}>
          {
            group.members.map((member, i) => (
              <Avatar height='36px' width='36px' key={`group-members-${group.id}-${i}`} name={member.username} src='' />
            ))
          }
        </AvatarGroup> }
        <IconButton
          borderRadius="full"
          variant="ghost"
          icon={<IoEllipsisHorizontal/>}></IconButton>
      </Box>
    </Box>
  );
}
