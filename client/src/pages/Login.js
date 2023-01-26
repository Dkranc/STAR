import React from "react";
import Config from "../Config";
import { PublicClientApplication } from "@azure/msal-browser";
import jwtDecode from "jwt-decode";

const Login = ({ user, setUser, isAuthenticated, setIsAuthenticated }) => {
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

  const login = async () => {
    try {
      await PubClientApp.loginPopup({
        scopes: Config.scopes,
        prompt: "select_account",
      });
      setIsAuthenticated(true);

      const identificationString = sessionStorage.getItem(
        "00000000-0000-0000-bbff-4e4f92dc8e7e.9188040d-6c67-4c5b-b112-36a304b66dad-login.windows.net-idtoken-4f6ef13e-6caf-4f1c-a896-52c4e641334a-0c60cfe1-4df2-45cf-96c5-f92c6e73288e---"
      );
       var USER = JSON.parse(identificationString)
       const token= USER.secret;
       USER =  jwtDecode(token); // decode your token here
       console.log(USER)
       sessionStorage.setItem('role',USER.roles[0])
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
    {sessionStorage.getItem("role")!=null? setIsAuthenticated(true): null}
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
