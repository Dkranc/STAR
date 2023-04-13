import { React, useState } from "react";
import "./Home.css";
import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Home = ({ user, setUser, lightState }) => {
  const [roles, setRoles] = useState([
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
    { name: "הזנת הערכת משהד", id: 5 },
  ]);

  const main = "ראשי - ";
  const pageName = main.concat(
    " ",
    user.roles[0] === "User.Admin" ? "מנהל" : "מדריך"
  ); //presented page name

  const navigate = useNavigate();

  const userRole = user.roles[0];

  const handleMashadTestClicked = (e) => {
    navigate("/MyTrainees", {
      state: {
        isMashad: true,
      },
    });
  };

  return (
    <div dir="rtl">
      <NavBar setUser={setUser} user={user} pageName={pageName} />
      <Box
        sx={{
          paddingY: "16px",
          paddingX: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Welcome setUser={setUser} user={user} />
        {roles.map((role) => {
          if (role.id === 5) {
            if (userRole === "User.Mashad" || userRole === "User.Admin") {
              return (
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    fontSize: "25px",
                    borderColor: "#2ED573",
                    color: "rgb(0,0,0)",
                    background: "white",
                    boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
                    width: "100%",
                    mt: 2,
                    borderRadius: 30,
                    fontFamily: "Bold",
                  }}
                  // color={lightState ? "success" : "info"}
                  key={role.id}
                  onClick={(e) => handleMashadTestClicked(e)}
                >
                  {role.name}
                </Button>
              );
            }
            return null;
          } else
            return (
              <Button
                variant="outlined"
                sx={{
                  fontSize: "25px",
                  borderColor: "#2ED573",
                  color: "rgb(0,0,0)",
                  background: "white",
                  boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
                  width: "100%",
                  mt: 2,
                  borderRadius: 30,
                  fontFamily: "Bold",
                }}
                onClick={() =>
                  navigate(`/SelectSoldiers/${role.id}`, {
                    state: { chosenSoldiers: [] },
                  })
                }
                key={role.id}
              >
                {role.name}
              </Button>
            );
        })}
      </Box>
    </div>
  );
};

export default Home;
