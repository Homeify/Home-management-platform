import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '../../../assets/icons';

const SearchField = ({ setQueryString }) => {
    return (
        <Box>
            <InputGroup
                bgColor='white.300'
                borderRadius='10'
                border='white'
                my='4'
            >
                <InputLeftElement pointerEvents='none' color='grey.100'>
                    <SearchIcon size='16pt' />
                </InputLeftElement>
                <Input
                    placeholder='Search for ...'
                    type='search'
                    name='search'
                    onChange={(e) => setQueryString(e.target.value)}
                    color='grey.500'
                    border='none'
                    focusBorderColor='secondary.300'
                    autoComplete='off'
                />
            </InputGroup>
        </Box>
    );
};

export default SearchField;
