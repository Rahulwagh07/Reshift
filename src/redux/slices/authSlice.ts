import { createSlice } from "@reduxjs/toolkit";

let token = null;
if (typeof window !== "undefined") {
  const tokenFromLocalStorage = localStorage.getItem("token");
  token = tokenFromLocalStorage;
}

let user = null;
if (typeof window !== "undefined") {
  const userFromLocalStorage = localStorage.getItem("user");
  user = userFromLocalStorage;
}

const initialState = {
  signupData: null,
  loading: false,
  token: token,
  user: user,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setUser(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
