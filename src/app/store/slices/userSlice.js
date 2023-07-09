import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  photoURL: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    logoutUser: (state) => {
      state.username = null;
      state.photoURL = null;
      state.email = null;
      state.uid = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
