import React from 'react';
import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SendIcon } from '../../../assets/icons';

export default function CommentInput({ value, handleInputChange, onSubmit }) {
    const { t } = useTranslation();

    return (
        <Box position='absolute' bottom='0' left='0' w='100%'>
            <Flex alignItems='center'>
                <Input
                    placeholder={t('writeComment')}
                    size='md'
                    value={value}
                    onChange={handleInputChange}
                    borderRadius='0 0 10px 10px'
                    border='none'
                    borderTop='1px'
                    borderTopColor='grey.100'
                    focusBorderColor='secondary.300'
                />
                <IconButton
                    variant='outline'
                    icon={<SendIcon size='15pt' />}
                    onClick={onSubmit}
                />
            </Flex>
        </Box>
    );
}
