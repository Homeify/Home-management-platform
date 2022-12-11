import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const ApplyButton = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <Flex justifyContent='center'>
            <Button colorScheme='primary' w='90%' mt='2' onClick={onClick}>
                {t('apply')}
            </Button>
        </Flex>
    );
};

export default ApplyButton;
