import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";

const Welcome = ({ setUser, user }) => {
  const [openOptionTab, setOpenOptionTab] = useState(false);

  var usrRoleInHebrew = "";

  if (user.roles[0] === "User.Admin") usrRoleInHebrew = "מנהל";
  if (user.roles[0] === "User.Instructor") usrRoleInHebrew = "מדריך/חונך/בוחן";
  if (user.roles[0] === "User.Mashad") usrRoleInHebrew = "משהד";

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    //need to navigate to login page
  };

  return (
    <div>
      <div id="top-bar">
        <h4>שלום {user.name} </h4>
        {user.roles[0] == "User.Mashad" ? <BarChartIcon /> : null}
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

      <p>{usrRoleInHebrew}</p>
      <h3>איזה תפקיד תרצה לאמן?</h3>
    </div>
  );
};

export default Welcome;
