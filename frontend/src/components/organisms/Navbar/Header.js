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
import { RewardCounter } from '../../molecules/Navbar';
import useWindowWidth from '../../../hooks/useWindowWidth';

export default function Header({ onOpen, ...rest }) {
    const { t } = useTranslation();
    const { isMobile } = useWindowWidth();

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
            boxShadow='0 3px 5px #eee'
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
                {!isMobile && <RewardCounter count={6969} />}
                <IconButton
                    size='sm'
                    variant='ghost'
                    aria-label='open menu'
                    icon={<BellIcon size='14pt' />}
                />
                <Flex alignItems={'center'}>
                    <HStack>
                        <AvatarWithPopover name='Diana V' size='sm' />
                        {!isMobile && (
                            <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems='flex-start'
                                spacing='1px'
                                ml='2'
                            >
                                <Text fontSize='sm'>Justina Clark</Text>
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