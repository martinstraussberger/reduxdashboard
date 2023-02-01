import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialMonth = new Date(2021, 0);

const monthSlice = createSlice({
  name: 'month',
  initialState: {
    sum: 0,
    month: initialMonth.getMonth(),
    // currentMonth: new Date().getMonth(),
    year: initialMonth.getFullYear(),
  },
  reducers: {
    incrementMonth: (state) => {
      state.month += 1;
      if (state.month > 11) {
        state.month = 0;
        state.year += 1;
      }
    },
    decrementMonth: (state) => {
      state.month -= 1;
      if (state.month < 0) {
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
export { monthSlice };
export const { month } = monthSlice.actions;
