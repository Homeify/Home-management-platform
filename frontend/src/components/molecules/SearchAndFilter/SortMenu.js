import React from 'react';
import {
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon } from '../../../assets/icons';
import { ApplyButton } from '../../atoms/SearchAndFilter';

const SortMenu = ({ name, criteria }) => {
    const { t } = useTranslation();
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ArrowDownIcon size='14pt' />}
                bgColor='white.300'
            >
                {name}
            </MenuButton>
            <MenuList>
                <MenuOptionGroup
                    defaultValue='asc'
                    type='radio'
                    title={t('order')}
                >
                    <MenuItemOption value='asc'>
                        {t('ascending')}
                    </MenuItemOption>
                    <MenuItemOption value='desc'>
                        {t('descending')}
                    </MenuItemOption>
                </MenuOptionGroup>

                <MenuDivider />

                <MenuOptionGroup
                    defaultValue={criteria[0]}
                    type='radio'
                    title={t('criteria')}
                >
                    {criteria.map((criterium, index) => (
                        <MenuItemOption key={index} value={criterium}>
                            {criterium}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
                <ApplyButton />
            </MenuList>
        </Menu>
    );
};

export default SortMenu;
