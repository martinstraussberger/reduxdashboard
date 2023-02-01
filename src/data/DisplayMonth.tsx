import React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { URL } from '../helpers/constants';
import './DisplayMonth.css';

type DisplayOrdersDataType = {
  children?: React.ReactNode | Record<string, unknown>;
};

export const DisplayMonth: FC<DisplayOrdersDataType> = () => {
  const { month } = useSelector((state: any) => state.month);

  const currentMonth = month;
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  const reportError = ({ message }: { message: string }) => {
    console.log('An error occured: ', error.message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetch(URL, { method: 'GET' })
          .then((response) => response.text())
          .then((responseText) => {
            const parseAsJSONObject = JSON.parse(responseText.substring(47).slice(0, -2));
            setData(parseAsJSONObject.table.rows);
          });
      } catch (error) {
        setError(error instanceof Error);
        reportError({ message: getErrorMessage(error) });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    throw new Error('An error occured: ', error);
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const filteredByMonthAndOrderVolume = months.map((month) => {
    const filteredData = data
      .filter(
        ({ c }: any) =>
          new Date(c[1].f).toLocaleString('default', { month: 'long' }) === month
      )
      .slice(0, 5)
      .sort((n: any, m: any) => m.c[3].v - n.c[3].v);
    const sum = filteredData.reduce((total, { c }: any) => total + c[3].v, 0);
    console.log(sum);
    return {
      month,
      sum,
      orders: filteredData,
    };
  });

  const selectedMonth = filteredByMonthAndOrderVolume.filter(
    ({ month }) => month === months[currentMonth]
  );

  const monthSum = selectedMonth.length > 0 ? selectedMonth[0].sum : 0;
  const euroCurrency = monthSum.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  const maxValue = 100000;
  const fillPercentage = (monthSum / maxValue) * 100;
  console.log('Percent: ', fillPercentage);

  return (
    <>
      <div key={monthSum} className='sum-month'>
        {euroCurrency}
      </div>
      <div
        style={{
          width: '100%',
          height: '42px',
          position: 'relative',
          borderRadius: '2px',
          backgroundColor: ' #202027',
          margin: '0 0 10vh 0',
          color: 'white'
        }}
      >
        <div
          style={{
            width: `${fillPercentage}%`,
            height: '100%',
            backgroundColor: '#2066d2',
            transform: 'rotate(0deg)',
          }}
        />
        <h3>Monthly Goal 100.000 €</h3>
      </div>
      <section className='listContainer'>
        {selectedMonth.map(({ month, orders }) => (
          <div key={month} className='grid'>
            <div className='_orderTitle'>
              <h3>{month}</h3>
              <p>Top 5 Order Volumes of the month</p>
            </div>
            {orders.map(({ c }: any) => (
              <React.Fragment key={c[0].v + c[2].v}>
                <span className='gridItem_1'>
                  <b>{c[0].v}</b>
                </span>
                <span className='gridItem_2'>
                  <b>
                    {new Date(c[1].f).toLocaleString('de', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </b>
                </span>
                <span className='gridItem_3'>
                  <b>{c[2].v}</b>
                </span>
                <span className='gridItem_4'>
                  <b>{c[3].v} €</b>
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};
