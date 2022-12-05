import React from 'react';
import { Card as ChakraCard, CardBody } from '@chakra-ui/react';

export default function Card({ containerClassName, className, children }) {
    return (
        <ChakraCard className={containerClassName} borderRadius='10px'>
            <CardBody className={className} borderRadius='10px'>
                {children}
            </CardBody>
        </ChakraCard>
    );
}
