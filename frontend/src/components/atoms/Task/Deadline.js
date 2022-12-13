import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DeadlineIcon } from '../../../assets/icons';
import { useWindowWidth } from '../../../hooks';

export default function Deadline({ date }) {
  const { t } = useTranslation();
  const { isMedium } = useWindowWidth();

  return (
    <Flex flexDir={isMedium ? 'column' : 'row'} alignItems='center' mr='10px'>
      <DeadlineIcon size='26pt' />
      <Flex flexDir='column' alignItems={isMedium ? 'center' : 'flex-start'} ml={isMedium ? '0' : '10px'}>
        <Text color='grey.500' textAlign='center'>{t('deadline')}</Text>
        <Text color='grey.900' as='b' textAlign='center'>
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}
