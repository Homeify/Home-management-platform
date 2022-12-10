import React from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Image,
    Link,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { NavItem } from './';
import { useTranslation } from 'react-i18next';
import logoImage from '../../../assets/logo.png';
import ROUTES from '../../../utils/routes';
import { GroupAddIcon, SettingsIcon } from '../../../assets/icons';
import { RewardCounter } from '../../molecules/Navbar';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { SignOutButton } from '../';

export default function SidebarContent({ onClose, linkItems, ...rest }) {
    const { t } = useTranslation();
    const { isMobile } = useWindowWidth();

    return (
        <Box
            transition='3s ease'
            bg={useColorModeValue('white', 'gray.900')}
            borderRight='1px'
            borderRightColor={useColorModeValue(
                'secondary.300',
                'secondary.300'
            )}
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}
        >
            <Flex
                h='10%'
                alignItems='center'
                mx='5'
                justifyContent='space-between'
            >
                <Link href={ROUTES.HOME} _hover={{ textDecor: 'none' }}>
                    <Flex justifyContent='flex-start'>
                        <Image src={logoImage} w='28pt' mr='5' />
                        <Text fontSize='2xl' fontWeight='bold'>
                            {t('appName')}
                        </Text>
                    </Flex>
                </Link>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>

            <Flex flexDir='column' h='90%'>
                {linkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        name={link.name}
                        link={link.link}
                        iconSize='14pt'
                    />
                ))}

                <Box>{isMobile && <RewardCounter count={6969} m='5' />}</Box>
                <Box mt='auto' mb='5'>
                    <NavItem
                        icon={SettingsIcon}
                        name={t('settings')}
                        link={'#'}
                        iconSize='14pt'
                    />
                    <SignOutButton />
                </Box>
            </Flex>
        </Box>
    );
}
