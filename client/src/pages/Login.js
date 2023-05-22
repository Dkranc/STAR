import { React, useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { themeLogin } from "../theme.js";
//import axios from "axios";
import "./Login.css";
//mui imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

//axios
import axios from "axios";

//import Images
import lightModeLogo from "../image/logoLightMode.png";
import darkModeLogo from "../image/logoLightMode.png";

/*
Login page - first page in the app:
Contains Login Button directing to microsoft login window and saving the auth token in session storage.
In addition, setting timer for auto logout and directing to ChooseTraining.js
*/
const Login = ({ setUser, lightState }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const PubClientApp = new PublicClientApplication({
    auth: {
      clientId: Config.appId,
      redirectUri: Config.redirectUri,
      authority: Config.authority,
    },
    cache: {
      cacheLocation: "sessionStorage", //this is where the user info will be. in the applications storage.
      storeAuthStateInCookie: true,
    },
  });

  const logout = (auto) => {
    window.alert("המערכת מתנתקת");

    for (var i = 0; i < sessionStorage.length; i++) {
      var a = sessionStorage.key(i);
      console.log(sessionStorage.key(i));
      sessionStorage.removeItem(a);
    }
    console.log(sessionStorage);
    sessionStorage.removeItem("token");
    console.log(sessionStorage);
    setUser(null);
    navigate("/");

    handleCloseMenu();
    window.location.reload(false);
  };
  const [openOptionTab, setOpenOptionTab] = useState(false);
  //handle click on menu button in navbar
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const login = async () => {
    console.log("hello");
    try {
      await PubClientApp.loginPopup({
        scopes: Config.scopes,
        prompt: "select_account",
      });

      Object.entries(sessionStorage).forEach(([key, item]) => {
        try {
          var parsedItem = JSON.parse(item);
          var secret = "";

          if (key.includes("idtoken")) {
            secret = parsedItem.secret;
            //set the token for sending requests
            axios
              .post(`http://localhost:8080/api/general/login`, [secret])
              .then((response) => {
                sessionStorage.setItem("token", response.data);
                setUser(jwtDecode(jwtDecode(response.data).secret));
              });
            setInterval(() => {
              logout("timer");
            }, 3600000);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={themeLogin}>
      <div id="login-page">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <img src={lightState ? lightModeLogo : darkModeLogo} alt="" />
            <Box noValidate sx={{ mt: 1 }}>
              <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  color: "black",
                  background:
                    "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
                  mt: 3,
                  mb: 2,
                  borderRadius: 30,
                  fontFamily: "Bold",
                  fontSize: "25px",
                }}
              >
                התחברות
              </Button>
              <Typography
                sx={{ mt: 8, mb: 4, fontFamily: "Light" }}
                variant="body1"
                align="center"
              >
                פותח ע"י חט"ל - ב"ז{" "}
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );

  // <div id="login-page">
  //   {sessionStorage.getItem("role") != null ? setIsAuthenticated(true) : null}
  //   <img id="star-logo" src="/star.jpg" alt="star Logo" />
  //   <button onClick={login}>התחברות</button>
  // </div>
};

export default Login;
