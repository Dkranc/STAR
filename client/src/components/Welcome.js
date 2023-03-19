import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
//mui
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

const Welcome = ({ setUser, user }) => {
  const [openOptionTab, setOpenOptionTab] = useState(false);

  var usrRoleInHebrew = "";

  if (user.roles[0] === "User.Admin") usrRoleInHebrew = "מנהל";
  if (user.roles[0] === "User.Instructor") usrRoleInHebrew = "מדריך/חונך/בוחן";
  if (user.roles[0] === "User.Mashad") usrRoleInHebrew = "משהד";

  const welcomeNameText = `שלום ${user.name}`;
  const welcomeMsgText = `את מי אנחנו מאמנים היום?`;

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    //need to navigate to login page
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
  return (
    <ThemeProvider>
      <div id="top-bar">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography fontFamily={"ExtraBold"}>{welcomeNameText}</Typography>
            <Typography>{welcomeMsgText}</Typography>
            <Typography>
              {user.roles[0] == "User.Mashad" ? <BarChartIcon /> : null}
            </Typography>
          </Box>
        </Container>
        {/* <MenuIcon
          onClick={() => {
            setOpenOptionTab(!openOptionTab);
          }}
        />
        {openOptionTab ? (
          <div id="opion-tab">
            <p onClick={logout}>התנתקות</p>
          </div>
        ) : null} */}
      </div>
    </ThemeProvider>
  );
};

export default Welcome;
