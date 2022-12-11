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

const FilterMenu = ({ name, filters, setValue, onSubmit }) => {
    return (
        <Menu closeOnSelect={false}>
            {({ onClose }) => (
                <>
                    <MenuButton
                        as={Button}
                        rightIcon={<ArrowDownIcon size='14pt' />}
                        bgColor='white.300'
                    >
                        {name}
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup type='checkbox' onChange={setValue}>
                            {filters.map((filter, index) => (
                                <MenuItemOption key={index} value={index}>
                                    {filter}
                                </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                        <ApplyButton
                            onClick={() => {
                                onSubmit();
                                onClose();
                            }}
                        />
                    </MenuList>
                </>
            )}
        </Menu>
    );
};

export default FilterMenu;
