import {configureStore} from '@reduxjs/toolkit';
import apiReducer from 'services/apiSlice';

const store = configureStore({
  reducer: {
    data: apiReducer,
  },
});

export default store;
