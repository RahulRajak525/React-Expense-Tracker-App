import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordAction } from "../Slices/asyncUserReducer";

const PassReset = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
    width: "350px",
    marginBottom: "6rem",
  };
  const btnStyle = { margin: "8px 0 " };
  const textfield = { width: "100%" };
  const userEmailChangeHandler = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const sendLinkButtonClickHandler = () => {
    dispatch(
      resetPasswordAction({
        userEmail: userEmail,
      })
    );
    setUserEmail("");
    navigate("/signIn")
  };

  const goToSignInPage = () => {
    navigate("/signIn");
  };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h4>Enter the email with which you have registered</h4>
          </Grid>
          <TextField
            style={textfield}
            required
            id="outlined-textarea"
            label="Email"
            placeholder="e.g. elon@gmail.com"
            onChange={userEmailChangeHandler}
            value={userEmail}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
            onClick={sendLinkButtonClickHandler}
          >
            Send Link
          </Button>

          <Typography fullWidth>
            Alredy a user ?<Button onClick={goToSignInPage}>Sign In</Button>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default PassReset;
