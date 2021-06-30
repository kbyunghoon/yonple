import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post_list: [],
    difficult: "a",
    detail: false,
    page: 0,
    is_last: false,
  },
  reducers: {
    GET_POST: (state, action) => {
      state.post_list = action.payload.data;
      state.page = action.payload.page;
      state.is_last = false;
      // state.user_img = action.payload.userProfile;
    },
    SHIFT_POST: (state, action) => {
      state.post_list.push(...action.payload.data);
      state.page = action.payload.page;
      // state.user_img = action.payload.userProfile;
    },
    DIFFICULT: (state, action) => {
      state.difficult = action.payload;
    },
    DETAIL: (state, action) => {
      state.detail = action.payload;
    },
    IS_LAST: (state, action) => {
      state.is_last = action.payload;
    },
  },
});

export const { GET_POST, SHIFT_POST, DIFFICULT, DETAIL, IS_LAST } =
  postSlice.actions;

export default postSlice.reducer;
