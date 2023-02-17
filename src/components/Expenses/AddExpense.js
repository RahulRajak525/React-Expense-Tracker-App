import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,  
  TextField,
} from "@mui/material";
import React, {useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseDataAction,
} from "../Slices/asyncExpenseReducer";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddExpense = (props) => {
  // console.log(props.setEditObj);
  const expenseItem = useSelector((state) => state.expenses.expenseItem);
  // const newdate  = expenseItem[0].date
  // console.log(newdate)
  // const userDetail = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const Category = ["Shopping", "Tour", "Fuel", "Entertainment", "Others"];
  const [expenseCost, setExpenseCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState(null);
  // console.log(date);
  const expenseChangeHandler = (e) => {
    e.preventDefault();
    setExpenseCost(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const addExpenseClickHandler = (expenseCost, description, category, date) => {
    if (!expenseCost || !description || !category || !date) {
      toast.warn("All fields are mandatory");
    } else {
      let localId = localStorage.getItem("localId");
      dispatch(
        addExpenseDataAction({
          localId,
          expenseCost,
          description,
          category,
          date,
        })
      );
    }
    setExpenseCost("");
    setDescription("");
    setCategory("");
    setDate(null);
  };

  return (
    <div>
      <h2>Add Expenses</h2>
      <Box component="form">
        <FormControl direction="flex" sx={{ m: 1, minWidth: 80 }}>
          <TextField
            type="number"
            id="outlined-textarea"
            label="Expenses"
            placeholder="Enter Expense"
            onChange={expenseChangeHandler}
            value={expenseCost}
          />
        </FormControl>
        <FormControl direction="flex" sx={{ m: 1, minWidth: 80 }}>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Add description"
            onChange={descriptionChangeHandler}
            value={description}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="demo-category"
            value={category}
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
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ my: 2, minWidth: 80 }}>
          <Button
            variant="contained"
            onClick={() =>
              addExpenseClickHandler(expenseCost, description, category, date)
            }
          >
            Add expense
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default AddExpense;
