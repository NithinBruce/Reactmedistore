import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUserFromLocalStorage } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


store.dispatch(setUserFromLocalStorage());

export default store;
