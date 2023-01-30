import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../helpers/constants';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch(URL, { method: 'GET' });
  const responseText = await response.text();
  // substring(47) --> removes unexpected tokens from google spreadsheet
  const parseAsJSONObject = JSON.parse(responseText.substring(47).slice(0, -2));
  return parseAsJSONObject.table.rows;
});

const initialMonth = new Date(2021, 0); 

const monthSlice = createSlice({
  name: 'month',
  initialState: {
    month: initialMonth.getMonth(),
    // currentMonth: new Date().getMonth(),
    year: initialMonth.getFullYear()
  },
  reducers: {
    incrementMonth: (state) => {
      state.month += 1;
      if(state.month > 11) {
        state.month = 0;
        state.year += 1;
      }
    },
    decrementMonth: (state) => {
      state.month -= 1;
      if(state.month < 0) {
        state.month = 11;
        state.year -= 1;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    month: monthSlice.reducer,
  },
});

export { store };
export {monthSlice};
export const { month } = monthSlice.actions;