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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "../Slices/asyncUserReducer";
import { toast } from "react-toastify";

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
    width: "350px",
    marginBottom: "6rem",
  };
  const isSignedUp = useSelector((state) => state.user.isSignedUp);
  const avatarStyle = { backgroundColor: "#06cd83" };
  const passStyle = { margin: "10px auto " };
  const btnStyle = { margin: "8px 0 " };
  const textfield = { width: "100%", margin: "5px" };
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const userEmailChangeHandler = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const signUpButtonClickHandler = () => {
    if (!userEmail || !password) {
      toast.warn("All Fields are mandatory");
      return;
    } else {
      dispatch(
        signUpAction({
          userEmail: userEmail,
          password: password,
        })
      );
      navigate("/signIn");
    }

    setUserEmail("");
    setPassword("");
  };

  const toSignIn = () => {
    navigate("/signIn");
  };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>

          <TextField
            style={textfield}
            id="outlined-textarea-email"
            required
            label="Email"
            // placeholder="e.g. elon@gmail.com"
            onChange={userEmailChangeHandler}
            value={userEmail}
          />
          <FormControl fullWidth variant="outlined" style={passStyle}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={passwordChangeHandler}
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
              required
            />
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
            onClick={signUpButtonClickHandler}
          >
            SignUp
          </Button>
          <Typography fullWidth>
            Already have an account ?<Button onClick={toSignIn}>Sign In</Button>
          </Typography>
        </Paper>
      </Grid>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default SignUp;
