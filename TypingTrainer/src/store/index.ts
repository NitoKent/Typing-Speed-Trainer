import { configureStore } from '@reduxjs/toolkit';
import typingReducer, { TypingState } from './typingSlice';

const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});

export type RootState = {
  typing: TypingState;
};

export type AppDispatch = typeof store.dispatch;

export default store;
