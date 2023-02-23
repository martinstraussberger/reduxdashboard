import { FC, useState, useEffect } from 'react';
import { useInterval } from '../../hooks/useInterval';

interface RemainingTimeProps {
  duration: number;
}
export const RemainingTimeToRefresh: FC<RemainingTimeProps> = ({ duration }) => {
  const [remainingTime, setRemainingTime] = useState<number>(duration / 1000);

  useInterval(() => {
    setRemainingTime((prevTime) => prevTime - 1);
  }, 1000);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(20);
    }
  }, [remainingTime]);
  return (
    <div style={{ textAlign: 'right' }}>
      <h2>Refetch in: {remainingTime}s</h2>
    </div>
  );
};

