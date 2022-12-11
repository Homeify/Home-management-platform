import React from 'react';
import { Box, Button, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../utils/routes';
import { NotFoundAnimation } from '../atoms/Animations';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <Box w='100%' h='100%'>
            <Flex
                w='100%'
                h='20pc'
                align='center'
                justifyContent='center'
                pt='50pt'
            >
                <NotFoundAnimation style={{ height: '100%' }} />
                <VStack align='flex-start' gap='5'>
                    <Text fontSize='5xl' as='b' color='grey.900'>
                        {t('pageNotFound')}
                    </Text>
                    <Text color='grey.500'>{t('pageNotFoundDescr')}</Text>
                    <Link href={ROUTES.HOME}>
                        <Button colorScheme='primary'>{t('backHome')}</Button>
                    </Link>
                </VStack>
            </Flex>
        </Box>
    );
}
