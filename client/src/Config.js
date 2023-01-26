
/*still need to add this application to AZURE AD in order to authenticate*/
const Config = {
  appId: `4f6ef13e-6caf-4f1c-a896-52c4e641334a`,
  redirectUri: `http://localhost:3000`,
  scopes: [`user.read`],
  authority: `https://login.microsoftonline.com/bomb669gmail.onmicrosoft.com`,
};

export default Config;