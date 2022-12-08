import React from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DetailsIcon } from '../../../assets/icons';

export default function DetailsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Box display='flex' flexDir='row' alignItems='center' mt='20px'>
        <DetailsIcon size='15pt' />
        <Text color='grey.900' as='b' ml='10px'>
          {t('details')}
        </Text>
      </Box>
      <Divider />
    </>
  );
}
