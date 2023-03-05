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

      const identificationString = sessionStorage.getItem(
        "00000000-0000-0000-962e-7a155b2539a0.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-idtoken-4f6ef13e-6caf-4f1c-a896-52c4e641334a-0c60cfe1-4df2-45cf-96c5-f92c6e73288e---"
        //"00000000-0000-0000-bbff-4e4f92dc8e7e.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-idtoken-4f6ef13e-6caf-4f1c-a896-52c4e641334a-0c60cfe1-4df2-45cf-96c5-f92c6e73288e---"
      );
      var roleInfoToken = JSON.parse(identificationString);

      const token = roleInfoToken.secret;
      roleInfoToken = jwtDecode(token); // decode your token here
      console.log(roleInfoToken);

      sessionStorage.setItem("role", roleInfoToken.roles[0]);

      const userInfo = sessionStorage.getItem(
        "00000000-0000-0000-962e-7a155b2539a0.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-0c60cfe1-4df2-45cf-96c5-f92c6e73288e"
        //"00000000-0000-0000-bbff-4e4f92dc8e7e.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-0c60cfe1-4df2-45cf-96c5-f92c6e73288e"
      );
      var userInfoJson = JSON.parse(userInfo);
      console.log(userInfoJson);
      sessionStorage.setItem("user", JSON.stringify(userInfoJson));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    PubClientApp.logout();
    setIsAuthenticated(false);
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        <Link color="inherit">{`פותח ע"י חט"ל - ב"ז`}</Link>{" "}
      </Typography>
    );
  }

  return (
    <ThemeProvider>
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
          <img src={lightModeLogo} alt="" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              התחברות
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  // <div id="login-page">
  //   {sessionStorage.getItem("role") != null ? setIsAuthenticated(true) : null}
  //   <img id="star-logo" src="/star.jpg" alt="star Logo" />
  //   <button onClick={login}>התחברות</button>
  // </div>
};

export default Login;
