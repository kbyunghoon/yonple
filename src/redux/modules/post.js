import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post_list: [],
    keyword: "",
    difficult: "a",
    detail: false,
    pages: 0,
  },
  reducers: {
    GET_POST: (state, action) => {
      state.post_list = action.payload.data;
      // state.user_img = action.payload.userProfile;
    },
    SHIFT_POST: (state, action) => {
      state.post_list.push(...action.payload.data);
      // state.user_img = action.payload.userProfile;
    },
    KEYWORD: (state, action) => {
      state.keyword = action.payload.uploading;
    },
    DIFFICULT: (state, action) => {
      state.difficult = action.payload;
    },
    DETAIL: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { GET_POST, SHIFT_POST, KEYWORD, DIFFICULT, DETAIL } =
  postSlice.actions;

export default postSlice.reducer;
