import React from 'react';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';

export default function NavItem({ link, icon, name, iconSize, ...rest }) {
    return (
        <Link
            href={link}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align='center'
                p='4'
                mx='4'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                _hover={{
                    bg: 'primary.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Box mr='4'>
                        <Icon
                            fontSize='24'
                            _groupHover={{
                                color: 'white',
                            }}
                            as={icon}
                            size={iconSize}
                        />
                    </Box>
                )}
                <Text as='b' fontSize='lg'>
                    {name}
                </Text>
            </Flex>
        </Link>
    );
}
