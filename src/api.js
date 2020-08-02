import { parse, isSameMonth } from 'date-fns';

import { data } from './data';

export function getDataForMonth(month) {
  const days = data.filter((day) => {
    const date = parse(day.date, 'yyyy-MM-dd', new Date());
    return isSameMonth(date, month);
  });

  return Promise.resolve(days);
}
