import { createSlice } from "@reduxjs/toolkit";

// const initialToken = localStorage.getItem("token");
// const initialMail = localStorage.getItem("email");
// const userLogedIn = !!initialToken;

const initialAuthState = {
  // isLogedIn: userLogedIn,
  bearerToken: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  user: {},
  isLogedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLogedIn = true;
      state.bearerToken = action.payload.idToken;
      state.email = action.payload.email.replace(/[.]/g, "");
      // localStorage.setItem("email", action.payload.email.replace(/[.]/g, ""));
      // localStorage.setItem("token", action.payload.idToken);
    },
    logout(state) {
      // localStorage.removeItem("token");
      // localStorage.removeItem("email");
      state.bearerToken = null;
      state.email = "";
      state.user = {};
      state.isLogedIn = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
