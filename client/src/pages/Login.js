import { React, useEffect, useState } from "react";
import Config from "../Config";
import { PublicClientApplication } from "@azure/msal-browser";
import jwtDecode from "jwt-decode";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [goodLogin, setGoodLogin] = useState(false);
  const PubClientApp = new PublicClientApplication({
    auth: {
      clientId: Config.appId,
      redirectUri: Config.redirectUri,
      authority: Config.authority,
    },
    cache: {
      cacheLocation: "sessionStorage", //this is where the user info will be. in the applications torage.
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
    <div id="login-page">
      {sessionStorage.getItem("role") != null ? setIsAuthenticated(true) : null}
      <img id="star-logo" src="/star.jpg" alt="star Logo" />
      <button onClick={login}>התחברות</button>
    </div>
  );
};

export default Login;
