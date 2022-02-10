import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGetCharacters,
  fetchGetComicsLast,
  fetchGetComicsNews,
  fetchGetEvents,
  fetchGetSeries,
} from "./homeAPI";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchGetCharacterById, fetchGetCharacters } from "./characterAPI";

const initialState = {
  status: "idle",
  events: [],
  characters: [],
  newsComics: [],
  lastComics: [],
  series: [],
  error: "",
};

export const getEvents = createAsyncThunk("news/events", async () => {
  const response = await fetchGetEvents();
  return response;
});
export const getNewsComics = createAsyncThunk("news/comics", async () => {
  const response = await fetchGetComicsNews();
  return response;
});
export const getLastComics = createAsyncThunk("last/comics", async () => {
  const response = await fetchGetComicsLast();
  return response;
});
export const getSeries = createAsyncThunk("news/series", async () => {
  const response = await fetchGetSeries();
  return response;
});
export const getCharacters = createAsyncThunk("news/characters", async () => {
  const response = await fetchGetCharacters();
  return response;
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.characters = action.payload.data.slice(7);
        } else {
          state.error = "Characters not founds";
        }
      });
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.events = action.payload.data.slice(1);
        } else {
          state.error = "Events not founds";
        }
      });
    builder
      .addCase(getNewsComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsComics.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.newsComics = action.payload.data;
        } else {
          state.error = "Comics not founds";
        }
      });
    builder
      .addCase(getLastComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLastComics.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.lastComics = action.payload.data;
        } else {
          state.error = "Comics not founds";
        }
      });
    builder
      .addCase(getSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.series = action.payload.data;
        } else {
          state.error = "Series not founds";
        }
      });
  },
});

export default homeSlice.reducer;
