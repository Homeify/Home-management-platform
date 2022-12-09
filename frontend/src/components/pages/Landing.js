import React from 'react';
import { Button, Link } from '@chakra-ui/react';

export default function Landing() {
    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <Link href='/home'>
                <Button colorScheme='primary'>Go to Home Page</Button>
            </Link>
        </div>
    );
}
