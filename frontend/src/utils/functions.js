import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEYS } from './constants';

const getDateElements = (date) => {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const getFormattedDate = (date, months, hasYear = false, dashed = false) => {
  const monthsArr = months.split(' ');
  const dateElements = getDateElements(date);
  const day = dateElements.day;
  const month = monthsArr[dateElements.month];
  const year = dateElements.year;
  let formattedDate;
  if (!dashed) {
    formattedDate = day + ' ' + month + (hasYear ? ' ' + year : '');
  } else {
    formattedDate = year + '-' + (dateElements.month + 1) + '-' + day;
  }
  return formattedDate;
};

export {
  getDateElements,
  getFormattedDate
};
