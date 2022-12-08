import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../Avatar';

export default function Assigned({ name }) {
  const { t } = useTranslation();
  return (
    <Box display='flex' flexDir='row' alignItems='center'>
      <Avatar name={name} m='0' />
      <Box ml='10px'>
        <Text color='grey.500'>{t('assigned')}</Text>
        <Text color='grey.900' as='b'>
          {name}
        </Text>
      </Box>
    </Box>
  );
}
