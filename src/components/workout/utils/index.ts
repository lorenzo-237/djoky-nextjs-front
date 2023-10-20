import { WORKOUT_LOCAL_KEY } from '@/constants';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { DateRangeType, PageFilterType } from '../types';

// Formatage des dates au format "YYYY-MM-DD" pour les champs de date
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const saveFilter = (filter: PageFilterType) => {
  localStorage.setItem(WORKOUT_LOCAL_KEY, JSON.stringify(filter));
};

export const getFilter = (): PageFilterType => {
  const data = localStorage.getItem(WORKOUT_LOCAL_KEY);

  if (data != null) {
    return JSON.parse(data);
  }

  return {
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
};

export const getDateRange = (): DateRangeType => {
  const filter = getFilter();

  if (filter.startDate != '' && filter.endDate != '') {
    return {
      min: filter.startDate,
      max: filter.endDate,
    };
  }

  return {
    min: formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
    max: formatDate(new Date()),
  };
};

export const getPageSize = (): number => {
  const filter = getFilter();

  return filter.pageSize;
};

export const deleteFilter = () => {
  const data = localStorage.getItem(WORKOUT_LOCAL_KEY);

  if (data != null) {
    localStorage.removeItem(WORKOUT_LOCAL_KEY);
  }
};
