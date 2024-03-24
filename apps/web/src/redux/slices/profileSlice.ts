import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

let user: User | null = null;
if (typeof window !== "undefined") {
  const userFromLocalStorage = localStorage.getItem("user");
  user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
}

const initialState = {
  user: user,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
