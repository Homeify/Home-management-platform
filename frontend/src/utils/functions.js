const getDateElements = (date) => {
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };
};

const getFormattedDate = (date, months, hasYear = false) => {
    const monthsArr = months.split(' ');
    const dateElements = getDateElements(date);
    const day = dateElements.day;
    const month = monthsArr[dateElements.month];
    const year = dateElements.year;
    const formattedDate = day + ' ' + month + (hasYear ? ' ' + year : '');
    return formattedDate;
};

export { getDateElements, getFormattedDate };
