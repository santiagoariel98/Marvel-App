import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "../features/home/homeSlice";

import characterReducer from "../features/character/characterSlice";
import comicReducer from "../features/comic/comicSlice";
import creatorReducer from "../features/creator/creatorSlice";
import eventReducer from "../features/event/eventSlice";
import serieReducer from "../features/serie/serieSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    comics: comicReducer,
    creators: creatorReducer,
    series: serieReducer,
    home: homeReducer,
    event: eventReducer,
  },
});
