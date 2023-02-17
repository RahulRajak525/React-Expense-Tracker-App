import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiExpenseService } from "../Services/apiExpenseService";

export const addExpenseDataAction = createAsyncThunk(
  "addExpenseDataAction",
  async (expense, thunkAPI) => {
    const response = await ApiExpenseService.addExpenseItem(
      expense,
      expense.localId
    );
    return response;
  }
);
export const getExpenseDataAction = createAsyncThunk(
  "getExpenseDataAction",
  async (data, thunkAPI) => {
    const response = await ApiExpenseService.getExpenseItem(data);
    return response;
  }
);
export const deleteExpenseDataAction = createAsyncThunk(
  "deleteExpenseDataAction",
  async (deleteInfo, thunkAPI) => {
    const response = await ApiExpenseService.deleteExpenseItem(
      deleteInfo.name,
      deleteInfo.localId
    );
    return response;
  }
);
export const editExpenseDataAction = createAsyncThunk(
  "editExpenseDataAction",
  async (editInfo, thunkAPI) => {
    const response = await ApiExpenseService.editExpenseItem(editInfo);

    return response;
  }
);
