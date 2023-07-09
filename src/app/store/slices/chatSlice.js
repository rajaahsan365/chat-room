import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "null",
  user: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    changeUser: (state, action) => {
      const { currentUser } = action.payload;
      const { uid } = action.payload.u;

      state.user = action.payload.u;
      state.chatId =
        currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;
    }, 
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
