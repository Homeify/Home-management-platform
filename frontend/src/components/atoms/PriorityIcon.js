import React from 'react';
import {
    HighPriorityIcon,
    LowPriorityIcon,
    MediumPriorityIcon,
} from '../../assets/icons';

export default function PriorityIcon({ priority }) {
    return (
        <>
            {priority === 0 ? (
                <LowPriorityIcon />
            ) : priority === 1 ? (
                <MediumPriorityIcon />
            ) : (
                <HighPriorityIcon />
            )}
        </>
    );
}
