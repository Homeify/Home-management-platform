import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import '../../../styles/tasks.scss';
import { Card } from '..';
import { DeadlineIcon } from '../../../assets/icons';
import { getFormattedDate } from '../../../utils/functions';
import { PriorityIcon } from '..';
import StatusTag from './StatusTag';

export default function TaskListItem({ item, selected }) {
  const { t } = useTranslation();
  const { title, priority, status, deadline } = item;
  const deadlineFormattedDate = getFormattedDate(
      deadline,
      t('allMonths'),
      false,
  );

  return (
    <Card
      className={`task-li ${selected ? 'task-li-border' : ''}`}
      containerClassName='task-li-container'
    >
      <PriorityIcon priority={priority} />
      <Text m='0 20px' flexGrow='1' as='b' fontSize='xl' w='150px'>
        {title}
      </Text>

      <Box display='flex' flexDir='row' alignItems='center'>
        <DeadlineIcon size='18pt' />
        <Text as='b' m='0 30px 0 10px' minW='60px'>
          {deadlineFormattedDate}
        </Text>
      </Box>

      {/* <Avatar name={authorName} size='sm' /> */}

      <StatusTag status={status} />
    </Card>
  );
}
