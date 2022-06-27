import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const UserSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setUser } = UserSlicer.actions;
export default UserSlicer.reducer;
