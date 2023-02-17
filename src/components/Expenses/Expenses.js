import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteExpenseDataAction,
  getExpenseDataAction,
} from "../Slices/asyncExpenseReducer";
import "react-toastify/dist/ReactToastify.css";
import EditExpense from "./EditExpense";
import AddExpense from "./AddExpense";
import { expenseActions } from "../Slices/expenseSlice";
import { userActions } from "../Slices/userSlice";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expenseItem = useSelector((state) => state.expenses.expenseItem);
  const isPremiumMember = useSelector((state) => state.user.isPrimeMember);

  var totalExpense = 0;
  expenseItem.map((prev) => {
    totalExpense = totalExpense + parseInt(prev.expenseCost);
  });

  useEffect(() => {
    if (totalExpense > 0) {
      dispatch(expenseActions.setTotalAmount(totalExpense));
    }
  });

  const isEdit = useSelector((state) => state.expenses.isEdit);
  const [open, setOpen] = useState(false);
  const [editObj, setEditObj] = useState(undefined);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const deleteButtonClickHandler = (row) => {
    dispatch(deleteExpenseDataAction(row));
    setOpen(false);
  };

  const editButtonClickHandler = (row) => {
    dispatch(expenseActions.editExpenseItem());
    setEditObj(row);
  };

 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const activatePremiumClickHandler = () => {
    dispatch(userActions.isPrimeMember());
  };

  const deactivatePremiumClickHandler = () => {
    dispatch(userActions.isNotPrimeMember());
  };

  return (
    <div>
      {isEdit ? (
        <div>
          <EditExpense editObj={editObj} />
        </div>
      ) : (
        <div>
          <AddExpense />
        </div>
      )}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Expense(₹)</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseItem ? (
                expenseItem.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell>{row.expenseCost}</StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={() => {
                          editButtonClickHandler(row);
                        }}
                      >
                        <EditIcon color="success" />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        variant="outlined"
                        onClick={() => {
                          deleteButtonClickHandler(row);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </StyledTableCell>
                    {/* <StyledTableCell>{row.name}</StyledTableCell> */}
                  </StyledTableRow>
                ))
              ) : (
                <div>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Loading....
                    </StyledTableCell>
                  </StyledTableRow>
                </div>
              )}
            </TableBody>
            {totalExpense ? (
              <TableBody>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Total Expense till Now:</StyledTableCell>
                  <TableCell>₹{totalExpense}</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="right" colSpan={6}>
                    No Expenses, please add item.
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            )}
            {totalExpense > 10000 &&
              (!isPremiumMember ? (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={6}>
                      <Button
                        variant="contained"
                        onClick={activatePremiumClickHandler}
                      >
                        Activate Premium
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      colSpan={6}
                      onClick={props.change}
                    >
                      <Button
                        variant="contained"
                        onClick={deactivatePremiumClickHandler}
                      >
                        Deactivate Premium
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Expenses;
