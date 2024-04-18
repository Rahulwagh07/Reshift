import { createSlice } from "@reduxjs/toolkit";

let token = null;
const getStorLocal = (item: string) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(item);
     
  }
  return null;
}

token = getStorLocal("token") || null;
 
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
