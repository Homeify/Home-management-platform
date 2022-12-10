import React from 'react';
import {
    Button,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '../../../assets/icons';
import { ApplyButton } from '../../atoms/SearchAndFilter';

const FilterMenu = ({ name = 'Filtru', filters = [] }) => {
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
                <MenuOptionGroup type='checkbox'>
                    {filters.map((filter, index) => (
                        <MenuItemOption key={index} value={filter}>
                            {filter}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
                <ApplyButton />
            </MenuList>
        </Menu>
    );
};

export default FilterMenu;
