import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DotsIcon } from '../../../assets/icons';

export default function TaskPopover({ showEditModal }) {
  const { t } = useTranslation();

  return (
    <Popover trigger='click' placement='left-start'>
      <PopoverTrigger>
        <Box cursor='pointer' m='0 10px'>
          <DotsIcon />
        </Box>
      </PopoverTrigger>
      <PopoverContent border='none' borderRadius='10px' w='auto'>
        <PopoverArrow />
        <ButtonGroup
          variant='outline'
          orientation='vertical'
          isAttached
          size='sm'
          bgColor='white.300'
          shadow='xl'
          borderRadius='10px'
          spacing={0}
        >
          <Button>{t('assignTask')}</Button>
          <Button onClick={showEditModal}>{t('edit')}</Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  );
}
