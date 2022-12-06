import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Divider,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import {
    HighPriority,
    LowPriority,
    MediumPriority,
    Deadline,
    Close,
    Details,
    Diamond,
    Comments,
    Send,
} from '../../assets/icons';
import { getFormattedDate } from '../../utils/functions';
import Avatar from '../atoms/Avatar';

export default function TaskView({ task, deselectAll }) {
    const { t } = useTranslation();
    const {
        title,
        priority,
        assigned,
        deadline,
        created,
        description,
        authorName,
        reward,
    } = task;
    const months = t('allMonths');
    const [value, setValue] = React.useState('');
    const deadlineFormattedDate = getFormattedDate(deadline, months, false);
    const createdFormattedDate = getFormattedDate(created, months, true);
    const assignedName = assigned ? assigned : t('unknown');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    return (
        <>
            {/* <Box> */}
            {/* Card title */}
            <Box display='flex' flexDir='row' alignItems='center'>
                <Text fontSize='2xl' as='b' mr='20px' maxW='80%'>
                    {title}
                </Text>

                <Box flexGrow='1'>
                    {priority === 1 ? (
                        <LowPriority />
                    ) : priority === 2 ? (
                        <MediumPriority />
                    ) : (
                        <HighPriority />
                    )}
                </Box>
                <Box onClick={deselectAll} cursor='pointer'>
                    <Close />
                </Box>
            </Box>

            {/* Assigned and deadline */}
            <Box
                display='flex'
                flexDir='row'
                alignItems='center'
                justifyContent='space-between'
                m='20px 0'
                className='task-view-assgn-ddl'
            >
                <Box display='flex' flexDir='row' alignItems='center'>
                    <Avatar name={assignedName} m='0' />
                    <Box ml='10px'>
                        <Text color='grey.500'>{t('assigned')}</Text>
                        <Text color='grey.900' as='b'>
                            {assignedName}
                        </Text>
                    </Box>
                </Box>
                <Box display='flex' flexDir='row' alignItems='center'>
                    <Deadline size='26pt' />
                    <Box ml='10px' mr='20px'>
                        <Text color='grey.500'>{t('deadline')}</Text>
                        <Text color='grey.900' as='b'>
                            {deadlineFormattedDate}
                        </Text>
                    </Box>
                </Box>
            </Box>

            {/* Description */}
            <Text color='grey.500'>{description}</Text>

            {/* Details */}
            <Box display='flex' flexDir='row' alignItems='center' mt='20px'>
                <Details size='15pt' />
                <Text color='grey.900' as='b' ml='10px'>
                    {t('details')}
                </Text>
            </Box>
            <Divider />

            <Box
                display='flex'
                flexDir='row'
                alignItems='center'
                justifyContent='space-between'
                mt='10px'
            >
                <Text color='grey.900' as='b'>
                    {t('created')}
                </Text>
                <Box display='flex' flexDir='row' alignItems='center'>
                    <Text color='grey.900' mr='10px'>
                        {createdFormattedDate}
                    </Text>
                    <Popover trigger='hover'>
                        <PopoverTrigger>
                            <Box w='30px'>
                                <Avatar name={authorName} size='sm' m='0' />
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent bgColor='white.300' p='5px' w='auto'>
                            <Text>{authorName}</Text>
                        </PopoverContent>
                    </Popover>
                </Box>
            </Box>
            <Box
                display='flex'
                flexDir='row'
                alignItems='center'
                justifyContent='space-between'
                mt='10px'
            >
                <Text color='grey.900' as='b'>
                    {t('reward')}
                </Text>
                <Box display='flex' flexDir='row' alignItems='center'>
                    <Text color='grey.900' mr='10px'>
                        {reward}
                    </Text>
                    <Box w='30px'>
                        <Diamond size='32px' />
                    </Box>
                </Box>
            </Box>

            {/* Comments */}
            <Box display='flex' flexDir='row' alignItems='center' mt='20px'>
                <Comments size='15pt' />
                <Text color='grey.900' as='b' ml='10px'>
                    {t('comments')} (0)
                </Text>
            </Box>
            <Divider />

            {/* Comments list */}
            <Box mb='20pt' p='20px 0'>
                <Text color='grey.500'>{t('noComments')}</Text>
            </Box>

            {/* </Box> */}

            <Box position='absolute' bottom='0' left='0' w='100%'>
                <Input
                    placeholder={t('writeComment')}
                    size='md'
                    value={value}
                    onChange={handleInputChange}
                    borderRadius='0 0 10px 10px'
                    border='none'
                    borderTop='1px'
                    borderTopColor='grey.100'
                />
                <Box position='absolute' bottom='10px' right='20px'>
                    <Send size='15pt' />
                </Box>
            </Box>
        </>
    );
}
