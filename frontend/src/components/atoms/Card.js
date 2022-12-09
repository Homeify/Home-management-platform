import React from 'react';
import { Card as ChakraCard, CardBody } from '@chakra-ui/react';

export default function Card({ containerClassName, className, children }) {
  return (
    <ChakraCard
      borderRadius='10px'
      bgColor='white.300'
      className={containerClassName}
    >
      <CardBody className={className} borderRadius='10px'>
        {children}
      </CardBody>
    </ChakraCard>
  );
}
