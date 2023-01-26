import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";

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

  return (
    <div>
      <div id="top-bar">
        <h4>שלום {user.name} </h4>
        <BarChartIcon />
        <MenuIcon
          onClick={() => {
            setOpenOptionTab(!openOptionTab);
          }}
        />
        {openOptionTab ? (
          <div id="opion-tab">
            <p onclick={logout}>התנתקות</p>
          </div>
        ) : null}
      </div>

      <p>{usrRoleInHebrew}</p>
      <h3>איזה תפקיד תרצה לאמן?</h3>
    </div>
  );
};

export default Welcome;
