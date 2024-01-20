import { createSlice } from "@reduxjs/toolkit";

let token = null;
if (typeof window !== "undefined") {
  const tokenFromLocalStorage = localStorage.getItem("token");
  token = tokenFromLocalStorage;
}
 
const initialState = {
  signupData: null,
  loading: false,
  token: token,
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
  },
});

export const { setSignupData, setLoading, setToken} = authSlice.actions;
export default authSlice.reducer;
