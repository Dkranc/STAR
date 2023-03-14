import { React, useEffect, useState } from "react";
import Config from "../Config";
import { PublicClientApplication } from "@azure/msal-browser";
import jwtDecode from "jwt-decode";
//import "./Login.css";
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

//import Images
import lightModeLogo from "../image/logoLightMode.png";
import darkModeLogo from "../image/logoDarkMode.png";

const Login = ({ setIsAuthenticated, lightState }) => {
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

  useEffect(() => {
    if (goodLogin) setIsAuthenticated(true);
  }, [goodLogin]);

  const login = async () => {
    try {
      await PubClientApp.loginPopup({
        scopes: Config.scopes,
        prompt: "select_account",
      });
      setGoodLogin(true);

      Object.values(sessionStorage).map((item) => {
        var unset = true;
        try {
          var parsedItem = JSON.parse(item);
          var secret = "";
          var user = {};
          if (parsedItem.secret != null && unset) {
            secret = jwtDecode(parsedItem.secret);
            console.log(secret.roles[0]);
            sessionStorage.setItem("role", secret.roles[0]);
            unset = false;
          }

          if (parsedItem.name != null) {
            user = parsedItem;
            sessionStorage.setItem("user", JSON.stringify(user));
            console.log(user);
          }
        } catch (err) {}
      });
    } catch (err) {}
  };

  const logout = () => {
    PubClientApp.logout();
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <div id="login-page">
        {sessionStorage.getItem("role") != null
          ? setIsAuthenticated(true)
          : null}
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
            <Box

              noValidate
              sx={{ mt: 1 }}
            >
              <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 30 ,fontFamily: "Bold",fontSize:'25px'}}
                color={lightState ? "success" : "info"}
              >
                התחברות
              </Button>
              <Typography sx={{ mt: 8, mb: 4, fontFamily: "Light" }} variant="body1" align="center">
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
