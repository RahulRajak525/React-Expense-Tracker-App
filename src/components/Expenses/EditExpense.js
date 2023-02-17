import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { editExpenseDataAction } from "../Slices/asyncExpenseReducer";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { expenseActions } from "../Slices/expenseSlice";

const EditExpense = (props) => {
  const dispatch = useDispatch();
  const newData = props.editObj;
  const Category = ["Shopping", "Tour", "Fuel", "Entertainment", "Others"];
  const [updatedExpenseCost, setUpdatedExpenseCost] = useState(
    newData.expenseCost
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    newData.description
  );
  const [updatedCategory, setUpdatedCategory] = useState(newData.category);
  const [updatedDate, setUpdatedDate] = useState(newData.date);

  // const [updatedvalue, setUpdatedValue] = useState("");

  const expenseChangeHandler = (e) => {
    e.preventDefault();
    setUpdatedExpenseCost(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    e.preventDefault();
    setUpdatedDescription(e.target.value);
  };
  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setUpdatedCategory(value);
  };
  const cancelExpenseClickHandler = () => {
    setUpdatedDescription("");
    setUpdatedCategory("");
    setUpdatedExpenseCost("");
    setUpdatedDate(null);
    dispatch(expenseActions.cancelEditExpense());
  };
  const updatedExpenseClickHandler = () => {
    const updatedObj = {
      id: newData.id,
      expenseCost: updatedExpenseCost,
      category: updatedCategory,
      description: updatedDescription,
      date: updatedDate,
      name: newData.name,
      localId: newData.localId,
    };
    dispatch(editExpenseDataAction(updatedObj));
    setUpdatedDescription("");
    setUpdatedCategory("");
    setUpdatedExpenseCost("");
    setUpdatedDate(null);
  };

  return (
    <div>
      <h2>Edit Expenses</h2>
      <Box component="form">
        <FormControl direction="flex" sx={{ m: 1, minWidth: 80 }}>
          <TextField
            type="number"
            id="outlined-textarea"
            label="Expenses"
            placeholder="Enter Expense"
            onChange={expenseChangeHandler}
            value={updatedExpenseCost}
          />
        </FormControl>
        <FormControl direction="flex" sx={{ m: 1, minWidth: 80 }}>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Add description"
            onChange={descriptionChangeHandler}
            value={updatedDescription}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="demo-category"
            value={updatedCategory}
            onChange={handleChange}
            input={<OutlinedInput label="Category" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Category.map((ctg) => (
              <MenuItem key={ctg} value={ctg}>
                {ctg}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={updatedDate}
              onChange={(newDate) => {
                setUpdatedDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ my: 2, mx: 2, minWidth: 80 }}>
          <Button
            variant="contained"
            onClick={() => cancelExpenseClickHandler(props)}
          >
            Cancel
          </Button>
        </FormControl>
        <FormControl sx={{ my: 2, minWidth: 80 }}>
          <Button
            variant="contained"
            onClick={() => updatedExpenseClickHandler()}
          >
            Update expense
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default EditExpense;
