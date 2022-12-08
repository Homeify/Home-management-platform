import React from 'react';
import { Button, Link } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Link href='/'>
        <Button colorScheme='primary'>Go to Landing Page</Button>
      </Link>
    </div>
  );
}
