import { useEffect, useState } from 'react';

interface Props {
  onRefresh: () => void;
}

export const RefreshBox: React.FC<Props> = ({ onRefresh }) => {
    const [count, setCount] = useState<number>(60);

    useEffect(() => {
        const intervalInSeconds = setInterval(() => {
            setCount((prevCount) => prevCount -1)
        }, 1000);
        return () => clearInterval(intervalInSeconds);
    }, [])

    useEffect(() => {
        if (count === 0) {
            onRefresh();
            setCount(60);
        }
    }, [count, onRefresh])

    return (
        <div style={{textAlign: 'right'}}>
            <h2>Refresh in {count}</h2>
        </div>
    )
}