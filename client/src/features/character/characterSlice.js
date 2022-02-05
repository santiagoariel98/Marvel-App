import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGetCharacterById,
  fetchGetCharacters,
  fetchGetData,
} from "./characterAPI";

const initialState = {
  status: {
    general: "idle",
    comics: "idle",
    events: "idle",
    series: "idle",
  },
  currentCharacters: [],
  currentCharacter: {},
  errorMsg: "",
};

export const getCharactersAsync = createAsyncThunk(
  "character/getCharacters",
  async () => {
    const response = await fetchGetCharacters();
    return response;
  }
);
export const getDatatypeInfo = createAsyncThunk(
  "character/getDatatypeInfo",
  async (data) => {
    const response = await fetchGetData(data);
    return response;
  }
);
export const getCharacterByIdAsync = createAsyncThunk(
  "character/getCharacterById",
  async (id) => {
    const response = await fetchGetCharacterById(id);
    return response;
  }
);
export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersAsync.pending, (state) => {
        state.status.general = "loading";
      })
      .addCase(getCharactersAsync.fulfilled, (state, action) => {
        state.status.general = "idle";
        if (action.payload.success) {
          state.currentCharacters = action.payload.data;
        } else {
          state.errorMsg = "Se ha producido un Problema";
        }
      });

    builder
      .addCase(getCharacterByIdAsync.pending, (state) => {
        state.status.general = "loading";
      })
      .addCase(getCharacterByIdAsync.fulfilled, (state, action) => {
        state.status.general = "idle";
        if (action.payload.success) {
          state.currentCharacter = action.payload;
        } else {
          state.errorMsg = "Se ha producido un Problema";
        }
      });

    builder
      .addCase(getDatatypeInfo.pending, (state, action) => {
        if (action.meta.arg.datatype === "comics") {
          state.status.comics = "loading";
        }
        if (action.meta.arg.datatype === "events") {
          state.status.events = "loading";
        }
        if (action.meta.arg.datatype === "series") {
          state.status.series = "loading";
        }
      })
      .addCase(getDatatypeInfo.fulfilled, (state, action) => {
        let status = action.payload.data.success;
        let datatype = action.payload.datatype;
        if (status && datatype === "comics") {
          state.status.comics = "idle";
          state.currentCharacter.data.comics = action.payload.data;
        } else if (status && datatype === "events") {
          state.status.events = "idle";
          state.currentCharacter.data.events = action.payload.data;
        } else if (status && datatype === "series") {
          state.status.series = "idle";
          state.currentCharacter.data.series = action.payload.data;
        } else {
          state.status.comics = "idle";
          state.status.events = "idle";
          state.status.series = "idle";
        }
      });
  },
});

export const selectPageCharacter = (state) => state.characters.page;
export const selectStatusCharacter = (state) => state.characters.status;
export const selectCurrentCharacters = (state) =>
  state.characters.currentCharacters;

export default characterSlice.reducer;
