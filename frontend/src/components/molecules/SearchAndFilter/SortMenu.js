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

const SortMenu = ({ name, criteria, setOrder, setValue, onSubmit }) => {
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
                    onChange={setOrder}
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
                    type='radio'
                    title={t('criterion')}
                    onChange={setValue}
                >
                    {criteria.map((criterion, index) => (
                        <MenuItemOption key={index} value={criterion}>
                            {criterion}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
                <ApplyButton onClick={onSubmit} />
            </MenuList>
        </Menu>
    );
};

export default SortMenu;
