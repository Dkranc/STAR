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

      const identificationString = sessionStorage.getItem(
        "00000000-0000-0000-bbff-4e4f92dc8e7e.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-idtoken-4f6ef13e-6caf-4f1c-a896-52c4e641334a-0c60cfe1-4df2-45cf-96c5-f92c6e73288e---"
      );
      var roleInfoToken = JSON.parse(identificationString);
      const token = roleInfoToken.secret;
      roleInfoToken = jwtDecode(token); // decode your token here
      sessionStorage.setItem("role", roleInfoToken.roles[0]);

      const userInfo = sessionStorage.getItem(
        "00000000-0000-0000-bbff-4e4f92dc8e7e.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-0c60cfe1-4df2-45cf-96c5-f92c6e73288e"
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

  return (
    <div id="login-page">
      {sessionStorage.getItem("role") != null ? setIsAuthenticated(true) : null}
      <img id="star-logo" src="/star.jpg" alt="star Logo" />
      <button onClick={login}>התחברות</button>
    </div>
  );
};

export default Login;
