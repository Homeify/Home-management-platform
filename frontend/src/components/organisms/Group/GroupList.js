import React from 'react';
import { Box } from '@chakra-ui/react';
import { GroupListItem } from '../../molecules/Group';

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
