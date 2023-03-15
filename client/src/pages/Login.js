import { React } from "react";
import Config from "../Config";
import { PublicClientApplication } from "@azure/msal-browser";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./Login.css";

const Login = ({ setUser }) => {
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
    <div id="login-page">
      <img id="star-logo" src="/star.jpg" alt="star Logo" />
      <button onClick={login}>התחברות</button>
    </div>
  );
};

export default Login;
