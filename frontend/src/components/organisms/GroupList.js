import React from 'react';
import GroupListItem from '../molecules/GroupListItem';
import { Box } from '@chakra-ui/react';

export default function GroupList({ groups }) {
  return (
    <Box display="flex" flexDirection="row" gap={6}>
      {groups?.map((group, i) =>
        <GroupListItem
          key={`listed-group-${i}`}
          group={group}
        />
      )}
    </Box>
  );
}
