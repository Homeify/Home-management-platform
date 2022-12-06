import React from 'react';
import {
    HighPriorityIcon,
    LowPriorityIcon,
    MediumPriorityIcon,
} from '../../assets/icons';

export default function PriorityIcon({ priority }) {
    return (
        <>
            {priority === 1 ? (
                <LowPriorityIcon />
            ) : priority === 2 ? (
                <MediumPriorityIcon />
            ) : (
                <HighPriorityIcon />
            )}
        </>
    );
}
