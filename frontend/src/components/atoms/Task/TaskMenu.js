import React from 'react';
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
    AddTaskIcon,
    DotsIcon,
    EditIcon,
    TrashIcon,
} from '../../../assets/icons';

export default function TaskMenu({ showEditModal }) {
    const { t } = useTranslation();

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<DotsIcon />}
                variant='ghost'
                borderRadius='full'
                mr='2'
            />
            <MenuList>
                <MenuItem icon={<AddTaskIcon size='14pt' />}>
                    {t('assignTask')}
                </MenuItem>
                <MenuItem
                    icon={<EditIcon size='14pt' />}
                    onClick={showEditModal}
                >
                    {t('edit')}
                </MenuItem>
                <MenuItem icon={<TrashIcon size='14pt' />} color='red.300'>
                    {t('deleteTask')}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
