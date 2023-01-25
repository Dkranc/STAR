import React from 'react';
import Config from "../Config";
import {PublicClientApplication} from "@azure/msal-browser";

const Login = (user, setUser, isAuthenticated, setIsAuthenticated,) => {

  const PubClientApp= new PublicClientApplication({
    auth:{
        clientId: Config.appId,
        redirectUri:Config.redirectUri,
        authority: Config.authority
    },
    cache:{
        cacheLocation:"sessionStorage",//this is where the user info will be. in the applications torage.
        storeAuthStateInCookie: true
    }
});

const login = async () => {
try{

await  PubClientApp.loginPopUp({
scopes: Config.scopes,
prompt:'select_account'
});
setIsAuthenticated(true);

} 
catch(err){
console.log('error');
}
}

const logout = ()=>{
PubClientApp.logout();
setIsAuthenticated(false);
}

  return (
    <div id='login-page'>
    <button onClick={()=>login}>Login</button>
    </div>
  )
}

export default Login