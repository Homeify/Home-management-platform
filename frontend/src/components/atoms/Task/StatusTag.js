import React from 'react';
import { Tag } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function StatusTag({ status, ...rest }) {
  const { t } = useTranslation();
  return (
    <Tag
      size='md'
      variant='solid'
      w='60pt'
      display='flex'
      alignItems='center'
      justifyContent='center'
      fontWeight='bold'
      textAlign='center'
      bgColor={
                status === 0 ?
                    'grey.100' :
                    status === 1 ?
                    'blue.100' :
                    'green.100'
      }
      color={
                status === 0 ?
                    'grey.900' :
                    status === 1 ?
                    'blue.900' :
                    'green.900'
      }
      {...rest}
    >
      {status === 0 ?
                t('todo') :
                status === 1 ?
                t('inprogress') :
                t('done')}
    </Tag>
  );
}
