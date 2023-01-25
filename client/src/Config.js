
/*still need to add this application to AZURE AD in order to authenticate*/
const Config = {
  appId: "app id from azure",
  redirectUri: "http://localhost:3000",
  scopes: ["user.read"],
  authority: "https://login.microsoftonline.com/tennent.onmicrosoft.com",
};

export default Config;