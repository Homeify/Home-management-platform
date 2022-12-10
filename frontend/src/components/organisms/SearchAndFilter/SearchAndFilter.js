import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FilterMenu, SortMenu } from '../../molecules/SearchAndFilter';
import { SearchField } from '../../atoms/SearchAndFilter';

const SearchAndFilter = ({ tasks, setQueryString }) => {
    const { t } = useTranslation();
    const filters = [
        {
            name: t('priority'),
            filterCriteria: [
                t('priorityHigh'),
                t('priorityMedium'),
                t('priorityLow'),
            ],
        },
        {
            name: t('status'),
            filterCriteria: [t('todo'), t('inprogress'), t('done')],
        },
    ];
    const sortCriteria = [
        t('title'),
        t('priority'),
        t('deadline'),
        t('reward'),
        t('noOfComments'),
    ];

    return (
        <Flex my='4' justifyContent='space-between' gap='4' flexWrap='wrap'>
            <SearchField setQueryString={setQueryString} />
            {filters.map((filter, i) => (
                <FilterMenu
                    key={i}
                    name={filter.name}
                    filters={filter.filterCriteria}
                />
            ))}
            <SortMenu name={t('sort')} criteria={sortCriteria} />
        </Flex>
    );
};

export default SearchAndFilter;
