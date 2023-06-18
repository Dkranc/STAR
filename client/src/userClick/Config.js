/*still need to add this application to AZURE AD in order to authenticate*/
const Config = {
  appId: process.env.REACT_APP_APP_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scopes: [`user.read`],
  authority: process.env.REACT_APP_AUTHORITY,
};

export default Config;
