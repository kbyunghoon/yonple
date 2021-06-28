import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const profileSlice = createSlice({
  name: "post",
  initialState: {
    post_list: [],
    user_img: "https://i.ibb.co/MDKhN7F/kakao-11.jpg",
  },
  reducers: {
    GET_PROFILE: (state, action) => {
      state.user_data = action.payload;
      state.user_img = action.payload.userProfile;
    },
    UPDATE_PROFILE: (state, action) => {
      state.uploading = action.payload.uploading;
    },
    set_preview: (state, action) => {
      state.user_img = action.payload;
    },
  },
});

// 프로필설정 페이지 진입 시 프로필 정보를 가져옵니다.
const getProfile = () => {
  return function (dispatch) {
    const get_DB = {
      url: "/api/userprofile",
      method: "GET",
    };
    axios(get_DB)
      .then((res) => {
        // 정보 가져오기 성공했다면
        dispatch(GET_PROFILE(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const { GET_PROFILE, UPDATE_PROFILE, set_preview } =
  profileSlice.actions;

export const reduxprofile = {
  getProfile,
  updateProfile,
  updateProfileimg,
};

export default profileSlice.reducer;
