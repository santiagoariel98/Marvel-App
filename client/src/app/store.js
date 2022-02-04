import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import characterReducer from "../features/character/characterSlice";
import homeReducer from "../features/home/homeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: characterReducer,
    home: homeReducer,
  },
});
