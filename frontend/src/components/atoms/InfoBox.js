import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function InfoBox({ label, info }) {
  return (
    <Box display="flex" flexDirection="column">
      <Text fontSize="xs" color="grey.500" fontWeight="500" textTransform="uppercase">{label}</Text>
      <Text fontSize="md" fontWeight="600">{info}</Text>
    </Box>
  );
}
