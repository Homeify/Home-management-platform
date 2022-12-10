import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FilterMenu, SortMenu } from '../../molecules/SearchAndFilter';
import { SearchField } from '../../atoms/SearchAndFilter';

const SearchAndFilter = ({ tasks, setTasks }) => {
    const { t } = useTranslation();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortCriterion, setSortCriterion] = useState();
    const [filterCriteria, setFilterCriteria] = useState({});
    const [searchQueryString, setSearchQueryString] = useState('');
    const searchParameters = Object.keys(Object.assign({}, ...tasks));

    useEffect(() => {
        sortAndFilter();
    }, [searchQueryString]);

    const cmpFunction = (a, b) => {
        switch (sortCriterion) {
            case t('title'):
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            case t('priority'):
                return sortOrder === 'asc'
                    ? a.priority - b.priority
                    : b.priority - a.priority;
            case t('deadline'):
                return sortOrder === 'asc'
                    ? a.deadline - b.deadline
                    : b.deadline - a.deadline;
            case t('reward'):
                return sortOrder === 'asc'
                    ? a.reward - b.reward
                    : b.reward - a.reward;
            default:
                return 0;
        }
    };

    const sortAndFilter = () => {
        let newTasks = [...tasks];
        if (filterCriteria?.priority?.length > 0) {
            newTasks = newTasks.filter((item) =>
                filterCriteria.priority.includes(item.priority)
            );
        }
        if (filterCriteria?.status?.length > 0) {
            newTasks = newTasks.filter((item) =>
                filterCriteria.status.includes(item.status)
            );
        }
        if (sortCriterion) {
            newTasks.sort(cmpFunction);
        }
        newTasks = newTasks.filter((item) =>
            searchParameters.some((param) => {
                return item[param]
                    ?.toString()
                    ?.toLowerCase()
                    .includes(searchQueryString);
            })
        );
        setTasks(newTasks);
    };

    const updateFilterValue = (filterName, value) => {
        const newVal = [...value];

        if (filterName === t('priority')) {
            setFilterCriteria({
                ...filterCriteria,
                priority: newVal,
            });
        } else if (filterName === t('status')) {
            setFilterCriteria({
                ...filterCriteria,
                status: newVal,
            });
        }
    };

    const filters = [
        {
            name: t('priority'),
            filterCriteria: [
                t('priorityLow'),
                t('priorityMedium'),
                t('priorityHigh'),
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
    ];

    return (
        <Flex my='4' justifyContent='flex-start' gap='4' flexWrap='wrap'>
            <SearchField setQueryString={setSearchQueryString} />
            {filters.map((f, i) => (
                <FilterMenu
                    key={i}
                    name={f.name}
                    filters={f.filterCriteria}
                    setValue={(newVal) => updateFilterValue(f.name, newVal)}
                    onSubmit={sortAndFilter}
                />
            ))}
            <SortMenu
                name={t('sort')}
                criteria={sortCriteria}
                setOrder={setSortOrder}
                setValue={setSortCriterion}
                onSubmit={sortAndFilter}
            />
        </Flex>
    );
};

export default SearchAndFilter;
