import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CommentsIcon } from '../../../assets/icons';

export default function CommentsHeader({ count }) {
  const { t } = useTranslation();

  return (
    <>
      <Box display='flex' flexDir='row' alignItems='center' mt='20px'>
        <CommentsIcon size='15pt' />
        <Text color='grey.900' as='b' ml='10px'>
          {t('comments')} ({count})
        </Text>
      </Box>
      <Divider />
    </>
  );
}
