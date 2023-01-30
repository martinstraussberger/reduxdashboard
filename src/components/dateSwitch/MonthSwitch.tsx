import './MonthSwitch.css';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { monthSlice } from '../../store';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { SwitchButton } from '../buttons/SwitchButton';
import { FC } from 'react';

type CurrenMonthType = {
  currentMonth: any;
  // setCurrentMonth: React.Dispatch<React.SetStateAction<{ month: number; year: number }>>;
  state: number;

};

const { incrementMonth, decrementMonth } = monthSlice.actions;
const MIN_DATE = new Date(2021, 0, 1);

export const MonthSwitch: FC<CurrenMonthType> = () => {
  const dispatch = useDispatch();
  const { month, year } = useSelector((state: any) => state.month);
  const CURRENT_DATE = new Date(year, month, 1);

  const handleDecrementLimit = useCallback(() => {
    if (CURRENT_DATE > MIN_DATE) {
      dispatch(decrementMonth());
    }
  }, [CURRENT_DATE, dispatch]);

  const handleIncrement = useCallback(() => {
    dispatch(incrementMonth());
  }, [CURRENT_DATE, dispatch]);

  return (
    <section className='flex-container'>
      <div className='title _box-md'>
        <h2>
          {CURRENT_DATE.toLocaleString('default', { month: 'long' })} {year}
        </h2>
      </div>
      <SwitchButton state={month} onClick={handleDecrementLimit} icon={<MdArrowBackIosNew />} />
      <SwitchButton state={month} onClick={handleIncrement} icon={<MdArrowForwardIos />} />
    </section>
  );
};