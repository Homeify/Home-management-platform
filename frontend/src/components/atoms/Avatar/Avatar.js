import React from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

export default function Avatar({ name, ...otherProps }) {
  return (
    <ChakraAvatar
      name={name}
      fontWeight='bold'
      m='0 20px'
      color='white.300'
      {...otherProps}
    />
  );
}
