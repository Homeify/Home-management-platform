import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DeadlineIcon } from '../../../assets/icons';

export default function Deadline({ date }) {
  const { t } = useTranslation();

  return (
    <Box display='flex' flexDir='row' alignItems='center'>
      <DeadlineIcon size='26pt' />
      <Box ml='10px' mr='20px'>
        <Text color='grey.500'>{t('deadline')}</Text>
        <Text color='grey.900' as='b'>
          {date}
        </Text>
      </Box>
    </Box>
  );
}
