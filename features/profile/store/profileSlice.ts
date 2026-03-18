import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  settings: Record<string, any>;
}

const initialState: ProfileState = {
  settings: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Record<string, any>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { updateSettings } = profileSlice.actions;
export default profileSlice.reducer;
