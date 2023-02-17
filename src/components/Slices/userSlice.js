import { createSlice } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
import {
  getUserDataAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
  updateProfileAction,
} from "./asyncUserReducer";

const initialState = {
  userDetails: undefined,
  isLoggedIn: false,
  isPrimeMember : false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.userDetails = "";
      localStorage.removeItem("idToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("localId");
      localStorage.removeItem("emailId");
      state.isLoggedIn = false;
    },
    isPrimeMember(state){
      state.isPrimeMember = true;
    },
    isNotPrimeMember(state){
      state.isPrimeMember = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAction.fulfilled, (state, action) => {
    });

    builder.addCase(signInAction.fulfilled, (state, action) => {
      localStorage.setItem("idToken", action.payload.idToken);
      state.userDetails = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("localId", action.payload.localId);
    });

    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getUserDataAction.fulfilled, (state, action) => {

      state.userDetails = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
  },
});

export default userSlice;
export const selectUserDatails = (state) => state.user.userDetails;
export const userActions = userSlice.actions;
