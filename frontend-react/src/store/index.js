import { configureStore } from '@reduxjs/toolkit';
import notificacionesReducer from './notificacionesSlice';

export const store = configureStore({
  reducer: {
    notificaciones: notificacionesReducer
  }
});