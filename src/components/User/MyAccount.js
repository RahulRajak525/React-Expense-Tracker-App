import React from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDatails } from "../Slices/userSlice";

const MyAccount = () => {
  const userDetail = useSelector(selectUserDatails);
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
    width: "350px",
    marginBottom: "6rem",
  };
  const passStyle = {
    margin: "10px auto ",
    textAlign: "center",
    objectFit: "cover",
  };
  const btnStyle = { margin: "8px 0 " };

  const goToUpdateProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div>{userDetail && (<Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar
            style={{ width: "80%", objectFit: "fill" }}
            alt="Rahul Rajak"
            src={userDetail.photoUrl}
            sx={{ width: 230, height: 200 }}
          />
        </Grid>

        <FormControl fullWidth style={passStyle}>
          <Typography variant="h6">{userDetail.displayName}</Typography>
        </FormControl>

        <FormControl fullWidth style={passStyle}>
          <Typography variant="h6">{userDetail.email}</Typography>
        </FormControl>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={btnStyle}
          onClick={goToUpdateProfile}
        >
          Update Profile
        </Button>
      </Paper>
    </Grid> )}  </div>
    
    
  );
};

export default MyAccount;
