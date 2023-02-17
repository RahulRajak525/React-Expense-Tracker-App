import { Button, Grid, InputLabel, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch } from "react-redux";
import { updateProfileAction } from "../Slices/asyncUserReducer";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const paperStyle = {
    padding: 20,
    margin: "20px auto",
    width: "350px",
    marginBottom: "6rem",
  };
  const btnStyle = { margin: "8px" };
  const textfield = { width: "100%", margin: "5px" };

  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNameChangeHandler = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const photoUrlChangeHandler = (e) => {
    e.preventDefault();
    setPhotoUrl(e.target.value);
  };

  const updateButtonClickHandler = (e) => {
    if (userName.length === 0 || photoUrl.length === 0) {
      alert("All fields are mandatory");
      return;
    } else {
      dispatch(
        updateProfileAction({
          displayName: userName,
          photoUrl: photoUrl,
        })
      );
    }
    setUserName("");
    setPhotoUrl("");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Contact Details</h2>
          </Grid>
          <InputLabel>Full Name</InputLabel>
          <TextField
            style={textfield}
            id="outlined-textarea-email"
            onChange={userNameChangeHandler}
            value={userName}
          />
          <InputLabel>
            <LanguageIcon /> <span>Photo Url </span>
          </InputLabel>

          <TextField
            style={textfield}
            id="outlined-textarea-email"
            onChange={photoUrlChangeHandler}
            value={photoUrl}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            // fullWidth
            style={btnStyle}
            onClick={updateButtonClickHandler}
          >
            Update
          </Button>
          <Button
            color="secondary"
            variant="contained"
            style={btnStyle}
            onClick={goToHome}
          >
            Cancel
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default UpdateProfile;
