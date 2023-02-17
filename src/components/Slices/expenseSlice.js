import { createSlice } from "@reduxjs/toolkit";
import {
  addExpenseDataAction,
  deleteExpenseDataAction,
  editExpenseDataAction,
  getExpenseDataAction,
} from "./asyncExpenseReducer";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenseItem: [],
    changed: false,
    isEdit: false,
    itemName: [],
    isEditable : false,
    totalAmount : 0,
  },
  reducers: {
    editExpenseItem(state, action){
      state.isEdit = true;
    },
    cancelEditExpense(state,action){
      state.isEdit = false;
    },
    setTotalAmount(state, action){
     state.totalAmount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addExpenseDataAction.fulfilled, (state, action) => {
      state.itemName.push(action.payload);
      state.changed = true;
    });
    builder.addCase(getExpenseDataAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.changed = false;
      state.expenseItem = action.payload;
      const itemArrayBeforeAddition = [];
      for (const key in response) {
        const newExpense = response[key];
        itemArrayBeforeAddition.push({
          expenseCost: newExpense.expenseCost,
          description: newExpense.description,
          category: newExpense.category,
          date: newExpense.date,
          name: key,
          id: newExpense.id,
          localId: newExpense.localId,
        });
      }
      state.expenseItem = itemArrayBeforeAddition;
    });
    builder.addCase(deleteExpenseDataAction.fulfilled, (state, action) => {
      state.changed = true;
    });
    builder.addCase(editExpenseDataAction.fulfilled, (state, action) => {
      state.changed = true;
      state.isEdit = false;
    });
  },
});

export default expenseSlice;
export const expenseActions = expenseSlice.actions;
