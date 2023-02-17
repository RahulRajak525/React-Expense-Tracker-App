import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../Slices/expenseSlice";
import userSlice from "../Slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    expenses: expenseSlice.reducer,
  },
});
export default store;
