import { React, useState } from "react";
import Config from "../Config";
import { PublicClientApplication } from "@azure/msal-browser";
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
import darkModeLogo from "../image/logoDarkMode.png";

const Login = ({ setUser, lightState }) => {
  const [goodLogin, setGoodLogin] = useState(false);
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

  const login = async () => {
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
                console.log(response.data);
                sessionStorage.setItem("token", response.data);
                setUser(jwtDecode(jwtDecode(response.data).secret));
              });
          }
        } catch (err) {}
      });
    } catch (err) {}
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
                  mt: 3,
                  mb: 2,
                  borderRadius: 30,
                  fontFamily: "Bold",
                  fontSize: "25px",
                }}
                color={lightState ? "success" : "info"}
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
