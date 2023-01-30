import { combineReducers } from '@reduxjs/toolkit'
import { month } from '../store/index';



// TODO: create custom type for RootState
const rootReducer = combineReducers({
    month,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;