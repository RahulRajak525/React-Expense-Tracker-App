import { Box, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Welcome.module.css";
const Welcome = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className={classes.welcome}>
      <div>
        <h1>Welcome to Expense Tracker</h1>
      </div>
      <div>
        {isLoggedIn !== "true" && (
          <div>
            <h3>Kindly, Login first to take ride!</h3>
          </div>
        )}
        {isLoggedIn === "true" && (
          <div>
            <span>
              For premium subscription, please add item more than Rs 10000
            </span>
          </div>
        )}
      </div>
      <Box mt={25}></Box>
    </div>
  );
};

export default Welcome;
