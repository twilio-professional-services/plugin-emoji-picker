import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const messageInputSlice = createSlice({
  name: "messageInput",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = messageInputSlice.actions;

export default messageInputSlice.reducer;
