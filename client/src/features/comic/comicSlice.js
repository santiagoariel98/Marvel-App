import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: {
    general: "idle",
    characters: "idle",
    events: "idle",
    creators: "idle",
  },
  comics: [],
  currentComic: {},
  errorMsg: [],
};
export const comicSlice = createSlice({
  name: "comics",
  initialState,
  reducers: {},
});

export default comicSlice.reducer;
