import { MonthSwitch } from './components/dateSwitch/MonthSwitch';
import { RefreshBox } from './components/refreshBox/refreshBox';
import { DisplayMonth } from './data/DisplayMonth';
import { useSelector } from 'react-redux';
import './variables.css';
import './App.css';
import { useState } from 'react';

function App() {
  const month = useSelector((state: any) => state.month);
  const [state, setState] = useState<number>(0);
  console.log(month);
  const handleRefresh = () => {
    setState(0);
  };

  return (
    <>
      <div className='wrapper'>
        <div className='auto-grid'>
          <div className='auto-grid_itemTimer'>
            <RefreshBox onRefresh={handleRefresh} />
          </div>
          <div className='auto-grid_item1'>
            <h3>Order Dashboard</h3>
            <MonthSwitch state={month} currentMonth={month} />
          </div>

          <div className='auto-grid_item2'>
          </div>
          <div className='auto-grid_item3'>
            <DisplayMonth />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
