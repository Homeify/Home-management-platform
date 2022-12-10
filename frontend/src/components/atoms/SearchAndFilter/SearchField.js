import React from 'react';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '../../../assets/icons';
import { useTranslation } from 'react-i18next';

const SearchField = ({ setQueryString }) => {
    const { t } = useTranslation();
    return (
        <Flex flexGrow='1'>
            <InputGroup bgColor='white.300' borderRadius='10' border='white'>
                <InputLeftElement pointerEvents='none' color='grey.100'>
                    <SearchIcon size='16pt' />
                </InputLeftElement>
                <Input
                    placeholder={t('searchPlaceholder')}
                    type='search'
                    name='search'
                    onChange={(e) => setQueryString(e.target.value)}
                    color='grey.500'
                    border='none'
                    focusBorderColor='secondary.300'
                    autoComplete='off'
                />
            </InputGroup>
        </Flex>
    );
};

export default SearchField;
