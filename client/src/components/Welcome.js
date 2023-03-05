import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
//mui
import Typography from '@mui/material/Typography';
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

const Welcome = ({ isAuthenticated }) => {
  const [openOptionTab, setOpenOptionTab] = useState(false);

  const userRole = sessionStorage.getItem("role");
  var usrRoleInHebrew = "";
  if (userRole === "User.Admin") usrRoleInHebrew = "מנהל";
  if (userRole === "User.Instructor") usrRoleInHebrew = "מדריך/חונך/בוחן";
  if (userRole === "User.Mashad") usrRoleInHebrew = "משהד";

  const userJson = sessionStorage.getItem("user");
  const user = JSON.parse(userJson)
  console.log(user)
  const logout = () => {
    isAuthenticated(false);
    //need to navigate to login page
    //and logout of public client
    // and clear the storage
  };

  // return (
  //   <div>
  //     <div id="top-bar">
  //       <h4>שלום {user.name} </h4>
  //       {userRole=='User.Mashad' ? <BarChartIcon /> : null}
        // <MenuIcon
        //   onClick={() => {
        //     setOpenOptionTab(!openOptionTab);
        //   }}
        // />
        // {openOptionTab ? (
        //   <div id="opion-tab">
        //     <p onClick={logout}>התנתקות</p>
        //   </div>
        // ) : null}
  //     </div>

  //     <p>{usrRoleInHebrew}</p>
  //     <h3>איזה תפקיד תרצה לאמן?</h3>
  //   </div>
  // );
  return (<ThemeProvider>
    <div id="top-bar">
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
                <Typography>
                שלום {user.name}
                </Typography>
                <Typography>
                {userRole=='User.Mashad' ? <BarChartIcon /> : null}
                </Typography>
                
                </Box>
                </Container>
                <MenuIcon
          onClick={() => {
            setOpenOptionTab(!openOptionTab);
          }}
        />
        {openOptionTab ? (
          <div id="opion-tab">
            <p onClick={logout}>התנתקות</p>
          </div>
        ) : null}
    </div>
    </ThemeProvider>);
};

export default Welcome;
