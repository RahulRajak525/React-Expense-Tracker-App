import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUserService } from "../Services/apiUserServices";

export const signUpAction = createAsyncThunk(
  "signUpAction",
  async (data, thunkAPI) => {
    const response = await ApiUserService.signUp(data);
    return response;
  }
);
export const signInAction = createAsyncThunk(
  "signInAction",
  async (data, thunkAPI) => {
    const response = await ApiUserService.signIn(data);
    return response;
  }
);
export const updateProfileAction = createAsyncThunk(
  "updateProfileAction",
  async (data, thunkAPI) => {
    const response = await ApiUserService.updateProfile(data);
    return response;
  }
);
export const getUserDataAction = createAsyncThunk(
  "getUserDataAction",
  async (data, thunkAPI) => {
    const response = await ApiUserService.getUserData(data);
    return response.users[0];
  }
);
export const resetPasswordAction = createAsyncThunk(
  "resetPasswordAction",
  async (data, thunkAPI) => {
    const response = await ApiUserService.resetPassword(data);
    return response;
  }
);
