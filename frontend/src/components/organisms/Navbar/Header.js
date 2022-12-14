import React from 'react';
import {
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import logoImage from '../../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { AvatarWithPopover } from '../../atoms/Avatar';
import { BellIcon, BurgerIcon } from '../../../assets/icons';
import { useWindowWidth } from '../../../hooks';
import { connect } from 'react-redux';

function Header({ onOpen, currentUser, groupId, ...rest }) {
    const { t } = useTranslation();
    const { isMobile } = useWindowWidth();
    const { first_name: firstName, last_name: lastName } = currentUser
        ? currentUser
        : {};

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue(
                'secondary.300',
                'secondary.300'
            )}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant='outline'
                aria-label='open menu'
                icon={<BurgerIcon />}
            />

            {isMobile && (
                <Flex justifyContent='center'>
                    <Image src={logoImage} w='28pt' mr='5' />
                    <Text fontSize='2xl' fontWeight='bold'>
                        {t('appName')}
                    </Text>
                </Flex>
            )}

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size='sm'
                    variant='ghost'
                    aria-label='open menu'
                    icon={<BellIcon size='14pt' />}
                    borderRadius='full'
                />
                <Flex alignItems={'center'}>
                    <HStack>
                        <AvatarWithPopover
                            name={`${firstName} ${lastName}`}
                            size='sm'
                        />
                        {!isMobile && (
                            <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems='flex-start'
                                spacing='1px'
                                ml='2'
                            >
                                <Text fontSize='sm'>{`${firstName} ${lastName}`}</Text>
                                <Text fontSize='xs' color='gray.600'>
                                    Admin
                                </Text>
                            </VStack>
                        )}
                    </HStack>
                </Flex>
            </HStack>
        </Flex>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps)(Header);
