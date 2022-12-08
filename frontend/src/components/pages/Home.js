import React from 'react';
import { Button, Link } from '@chakra-ui/react';

export default function Home() {
    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <Link href='/mygroups'>
                <Button colorScheme='primary'>Go to Groups</Button>
            </Link>
        </div>
    );
}
