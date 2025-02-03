import { createSlice } from "@reduxjs/toolkit";

export const userInfoReducer = createSlice({
  name: "userInfo",
  initialState: {
    user_id: "",
    firstName: "",
  },
  reducers: {
    getUserAction: (state, action) => {
      let { userId, fName } = action.payload;
      return {
        user_id: userId,
        firstName: fName,
      };
    },
  },
});

export const { getUserAction } = userInfoReducer.actions;
export default userInfoReducer.reducer;
