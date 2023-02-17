import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataAction, signInAction } from "../Slices/asyncUserReducer";
import { toast } from "react-toastify";
import { getExpenseDataAction } from "../Slices/asyncExpenseReducer";
const SignIn = () => {
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
    width: "350px",
    marginBottom: "6rem",
  };
  const avatarStyle = { backgroundColor: "#06cd83" };
  const passStyle = { margin: "10px auto " };
  const btnStyle = { margin: "8px 0 " };
  const textfield = { width: "100%" };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toSignUp = () => {
    navigate("/signUp");
  };

  const userEmailChangeHandler = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const userPasswordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const SignInButtonClickHandler = () => {
    if (!userEmail || !password) {
      toast.warn("All fields are mandatory");
      return;
    } else {
      dispatch(
        signInAction({
          userEmail: userEmail,
          password: password,
        })
      );
      setTimeout(() => {
        // dispatch(getUserDataAction());
        let localId = localStorage.getItem("localId");
        dispatch(getExpenseDataAction(localId));
        if (localId) {
          navigate("/expenses");
        }
      }, 1000);
    }
    setUserEmail("");
    setPassword("");
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            style={textfield}
            required
            id="outlined-textarea"
            label="Email"
            // placeholder=""
            onChange={userEmailChangeHandler}
            value={userEmail}
          />
          <FormControl fullWidth variant="outlined" style={passStyle}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              // placeholder="e.g. elon125@"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={userPasswordChangeHandler}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
            onClick={SignInButtonClickHandler}
          >
            Sign In
          </Button>
          {/* <Typography> */}
          <Link to="/passReset">Forget Password ?</Link>
          {/* </Typography> */}
          <Typography fullWidth>
            Do you have an account ?<Button onClick={toSignUp}>Sign up </Button>
          </Typography>
        </Paper>
      </Grid>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default SignIn;
