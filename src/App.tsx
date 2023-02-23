import { useSelector } from 'react-redux';
import { MonthSwitch } from './components/dateSwitch/MonthSwitch';
import { DisplayMonth } from './data/DisplayMonth';

import './variables.css';
import './App.css';

function App() {
  const month = useSelector((state: any) => state.month);
  console.log(month);

  return (
    <>
      <div className='wrapper'>
        <div className='auto-grid'>
          <div className='auto-grid_itemTimer'>
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
