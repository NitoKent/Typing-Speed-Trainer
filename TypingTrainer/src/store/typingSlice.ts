// src/store/typingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TypingState {
  text: string;
  input: string;
  startTime: number | null;
  endTime: number | null;
  errors: number;
  sentences: string[];
  currentSentenceIndex: number;
}

const initialState: TypingState = {
  text: "This is a sample text for typing.",
  input: "",
  startTime: null,
  endTime: null,
  errors: 0,
  sentences: [
    "This is a sample text for typing.",
    "Another example sentence for practice.",
    "Typing practice helps improve speed.",
  ],
  currentSentenceIndex: 0,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      if (state.startTime === null) {
        state.startTime = Date.now();
      }
      const newValue = action.payload;
      if (newValue.length <= state.text.length) {
        state.input = newValue;
        state.errors = newValue.split('').reduce((errors, char, index) => {
          return errors + (char !== state.text[index] ? 1 : 0);
        }, 0);
        if (newValue === state.text) {
          state.endTime = Date.now();
        }
      }
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    reset: (state) => {
      state.input = "";
      state.startTime = null;
      state.endTime = null;
      state.errors = 0;
    },
    selectNextSentence: (state) => {
      state.currentSentenceIndex = (state.currentSentenceIndex + 1) % state.sentences.length;
      state.text = state.sentences[state.currentSentenceIndex];
      state.input = "";
      state.startTime = null;
      state.endTime = null;
      state.errors = 0;
    },
  },
});

export const { setInput, setStartTime, reset, selectNextSentence } = typingSlice.actions;

export default typingSlice.reducer;
