import React from 'react';
import {
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import Avatar from './Avatar';

export default function AvatarWithPopover({ name }) {
  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        <Box w='30px'>
          <Avatar name={name} size='sm' m='0' />
        </Box>
      </PopoverTrigger>
      <PopoverContent bgColor='white.300' p='5px' w='auto'>
        <Text>{name}</Text>
      </PopoverContent>
    </Popover>
  );
}
