import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetCharacterById, fetchGetCharacters } from "./characterAPI";

const initialState = {
  status: "idle",
  page: 1,
  totalPage: 78,
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
        state.status = "loading";
      })
      .addCase(getCharactersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.currentCharacters = action.payload.data;
        } else {
          state.errorMsg = "Se ha producido un Problema";
        }
      });

    builder
      .addCase(getCharacterByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCharacterByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.currentCharacter = action.payload;
        } else {
          state.errorMsg = "Se ha producido un Problema";
        }
      });
  },
});

export const selectPageCharacter = (state) => state.characters.page;
export const selectStatusCharacter = (state) => state.characters.status;
export const selectCurrentCharacters = (state) =>
  state.characters.currentCharacters;

export default characterSlice.reducer;
