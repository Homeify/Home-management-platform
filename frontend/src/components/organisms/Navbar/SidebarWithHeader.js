import React, { useEffect, useState } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { Header } from './';
import { SidebarContent } from '../../atoms/Navbar';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../utils/routes';
import { GroupsIcon } from '../../../assets/icons';

export default function SidebarWithHeader({ userId, groupId, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const linkItems = [
    {
      name: t('myGroups'),
      icon: GroupsIcon,
      link: ROUTES.HOME,
    }
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
          <SidebarContent linkItems={linkItems} onClose={onClose}/>
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen}/>
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}
