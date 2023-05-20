import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  togglebtn: false,
  toggle: false,
  premium: false,
  loader: false,
  Notification: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    showToggle(state) {
      state.togglebtn = true;
    },
    switchToggle(state) {
      state.toggle = !state.toggle;
    },
    premium(state) {
      state.premium = true;
    },
    showLoader(state) {
      state.loader = true;
    },
    hideLoader(state) {
      state.loader = false;
    },
    showNotification(state) {
      state.Notification = true;
    },
    hideNotification(state) {
      state.Notification = false;
    },
    logout(state) {
      state.premium = false;
      state.togglebtn = false;
    },
  },
});

export default themeSlice;
export const themeActions = themeSlice.actions;
