import React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { URL } from '../helpers/constants';
import './DisplayMonth.css';

type DisplayOrdersDataType = {
  children?: React.ReactNode | Record<string, unknown>;
};

export const DisplayMonth: FC<DisplayOrdersDataType> = () => {
  const { month, year } = useSelector((state: any) => state.month);
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

  const filteredData = months.map((month) => {
    return {
      month,
      orders: data
        .filter(
          ({ c }: any) =>
            new Date(c[1].f).toLocaleString('default', { month: 'long' }) === month
        )
        .slice(0, 5)
        .sort((n: any, m: any) => m.c[3].v - n.c[3].v)
    };
  });
  console.log('currentMonth from DisplayMonth:', month + 'current year', year);

  const selectedMonth = filteredData.filter(
    ({ month }) => month === months[currentMonth]
  );

  console.log(months[currentMonth]);
  return (
    <section className='listContainer'>
      {selectedMonth.map(({ month, orders }) => (
        <div key={month} className='grid'>
          <div className="_orderTitle">
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
  );
};
