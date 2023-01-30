import { useState } from 'react';

export const useMonthState = (initialMonth = new Date(2021, 0)) => {
  const [month, setMonth] = useState<Date>(initialMonth);
  const newMonth = new Date(month);

  const handleViewOnLeftArrowClick = () => {
    newMonth.setMonth(newMonth.getMonth() - 1);
    setMonth(newMonth);
  };


  const handleViewOnRightArrowClick = () => {
    newMonth.setMonth(newMonth.getMonth() + 1);
    setMonth(newMonth);
  };


  return { month, setMonth, handleViewOnLeftArrowClick, handleViewOnRightArrowClick };
};