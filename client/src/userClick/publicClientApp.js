import Config from "./Config";
import { PublicClientApplication } from "@azure/msal-browser";
const pubClientApplication = new PublicClientApplication({
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
export default pubClientApplication;
