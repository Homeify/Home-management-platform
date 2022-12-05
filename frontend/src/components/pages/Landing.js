import { Button, Link } from '@chakra-ui/react';
import React from 'react';

export default function Landing() {
    return (
        <div>
            <Link href='/home'>
                <Button colorScheme='primary'>Go to Home Page</Button>
            </Link>
        </div>
    );
}
