import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { DiamondIcon } from '../../../assets/icons';

export default function RewardCounter({ count, ...rest }) {
    return (
        <Box display='inline-block'>
            <Flex
                bg='secondary.300'
                px='3'
                py='2'
                alignItems='center'
                borderRadius='10'
                {...rest}
            >
                <DiamondIcon />
                <Text as='b' fontSize='14pt' ml='4' color='primary.100'>
                    {count}
                </Text>
            </Flex>
        </Box>
    );
}
