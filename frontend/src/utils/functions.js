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

const getUserAwards = async (userId, groupId) => {
  const res = await axios.get(`${BASE_URL}/groups/users/${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)}`
    }
  });

  if (res.status === 200) {
    const { data } = res;
    const currentUser = data.filter((item) => item.user.id === userId)[0];
    const award = currentUser.awards;
    return award;
  }
  return 0;
};

export {
  getDateElements,
  getFormattedDate,
  getUserAwards
};
