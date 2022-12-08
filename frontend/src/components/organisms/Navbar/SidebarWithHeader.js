import React from 'react';
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';
import Header from './Header';
import { SidebarContent } from '../../atoms/Navbar';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../utils/routes';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { GroupsIcon, TaskIcon } from '../../../assets/icons';

export default function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const { isMobile } = useWindowWidth();

    const linkItems = [
        {
            name: t('myGroups'),
            icon: GroupsIcon,
            link: ROUTES.MYGROUPS,
        },
        {
            name: t('myTasks'),
            icon: TaskIcon,
            link: ROUTES.MYTASKS,
        },
    ];

    return (
        <Box
            minH='100vh'
            bg={useColorModeValue('secondary.100', 'secondary.900')}
        >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                linkItems={linkItems}
            />

            {/* mobile nav */}
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >
                <DrawerContent>
                    <SidebarContent linkItems={linkItems} onClose={onClose} />
                </DrawerContent>
            </Drawer>

            <Header onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                {children}
            </Box>
        </Box>
    );
}