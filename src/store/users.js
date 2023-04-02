import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "usersInfo",
  initialState: {
    activeUser: {},
    Users: [],
    errorstate: "",
  },
  reducers: {
    registerUser(state, action) {
      console.log(action.payload);
      state.Users.push(action.payload);
    },
    userLogin(state, action) {
      const existingUser = state.Users.filter(
        (e) => e.username == action.payload.username.trim()
      );
      if (!existingUser) {
        state.errorstate = "User with this username doesnt exist!!";
      } else if (existingUser.password != action.payload.password.trim()) {
        state.errorstate = "please enter correct password";
      } else {
        state.activeUser = action.payload;
      }
    },
  },
});

export const UsersReducers = UserSlice.reducer;
export const UsersReducerActions = UserSlice.actions;
