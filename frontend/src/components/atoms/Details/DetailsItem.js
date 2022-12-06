import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function DetailsItem({ itemName, info, children }) {
    return (
        <Box
            display='flex'
            flexDir='row'
            alignItems='center'
            justifyContent='space-between'
            mt='10px'
        >
            <Text color='grey.900' as='b'>
                {itemName}
            </Text>
            <Box display='flex' flexDir='row' alignItems='center'>
                <Text color='grey.900' mr='10px'>
                    {info}
                </Text>
                {children}
            </Box>
        </Box>
    );
}
