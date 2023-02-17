import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
const Footer = () => {

  return (
  
    <AppBar
      position="relative"
      color="inherit"
      sx={{ top: "50px", bottomMargin: "25px" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="Secondary"
            mx={2}
          >
            Contact me : 7355042995
          </Typography>
          rahulrajak525@gmail.com
          <Box>
            <IconButton
              size="large"
              color="inherit"
              href="https://instagram.com/rkraj525?igshid=ZDdkNTZiNTM="
              target="blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              href="https://github.com/RahulRajak525"
              target="blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/rahul-kumar-rajak-4b5a71174"
              target="blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.facebook.com/profile.php?id=100003691198033&sk=about"
              target="blank"
            >
              <FacebookIcon />
            </IconButton>
          </Box>
          <Typography noWrap component="div" variant="h7">
            @ All Right Reserved
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
    // {/* </AppBar> */}
  );
};

export default Footer;
