import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialVerified = localStorage.getItem("verified");
const userLogedIn = !!initialToken;

const initialAuthState = {
  isLogedIn: userLogedIn,
  bearerToken: initialToken,
  displayName: "",
  photo: "",
  isVerified: initialVerified,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("verified");
    },
    setDisplayName(state, action) {
      state.displayName = action.payload;
    },
    setPhoto(state, action) {
      state.photo = action.payload;
    },
    setIsVerified(state, action) {
      state.isVerified = action.payload;
      localStorage.setItem("verified", action.payload);
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
