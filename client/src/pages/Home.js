import { React, useEffect, useState } from "react";
import "./Home.css";
import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

const Home = ({ user, setUser, lightMode, setLightMode }) => {
  const demoRoles = {
    "User.Admin": "אדמין",
    "User.Manager": "מנהל",
    "User.Trainer": "מדריכה",
    "User.Mashad": "משה״ד",
  };

  const location = useLocation();

  const soldiers = location.state.soldiers;

  const [roles, setRoles] = useState([
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
    { name: "הזנת הערכת משהד", id: 6 },
  ]);

  const main = "ראשי - ";
  const pageName = main.concat(" ", demoRoles[user.roles[0]]); //presented page name
  const navigate = useNavigate();

  // const userRole = user.roles[0]; original
  const userRole = "User.Admin"; //change depend on Demo_roles to change layout
  const onClickBtn = (role) => {
    navigate(`../SelectSoldiers/${role.id}`, {
      state: {
        role: role.id,
        soldiers: soldiers,
        chosenSoldiers: [],
      },
    });
  };
  const handleManagerGraphClicked = (e) => {
    navigate("/Charts/ChooseRole", {
      state: {
        soldier: null,
        soldiers: location.state.soldiers,
      },
    });
  };
  const handleMashadTestClicked = (e) => {
    let mashadCheck;
    userRole == "User.Mashad" || "User.Admin"
      ? (mashadCheck = true)
      : (mashadCheck = false);
    navigate("/GeneralInput/ChooseRole", {
      state: {
        isMashad: mashadCheck,
        soldiers: soldiers,
      },
    });
  };

  return (
    <Box dir="rtl">
      <NavBar
        setUser={setUser}
        user={user}
        pageName={pageName}
        lightMode={lightMode}
      />
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
        {userRole === "User.Manager" ? (
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
            onClick={(e) => handleManagerGraphClicked(e)}
          >
            התקדמות אימון
          </Button>
        ) : userRole === "User.Mashad" ? (
          <Box sx={{ width: "100%" }}>
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
              onClick={(e) => handleManagerGraphClicked(e)}
            >
              התקדמות אימון
            </Button>
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
              onClick={(e) => handleMashadTestClicked(e)}
            >
              הערכת משה״ד
            </Button>
          </Box>
        ) : userRole === "User.Trainer" || userRole === "User.Admin" ? (
          <Box>
            {roles.map((role) => {
              if (role.id === 6) {
                if (userRole === "User.Admin") {
                  return (
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        fontSize: "25px",
                        borderColor: "#2ED573",
                        color: "rgb(0,0,0)",
                        background: "white",
                        boxShadow:
                          "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
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
                    onClick={() => onClickBtn(role)}
                    key={role.id}
                  >
                    {role.name}
                  </Button>
                );
            })}
          </Box>
        ) : (
          <Box></Box>
        )}
        {/* {roles.map((role) => {
          if (role.id === 6) {
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
                onClick={() => onClickBtn(role)}
                key={role.id}
              >
                {role.name}
              </Button>
            );
        })} */}
      </Box>
    </Box>
  );
};

export default Home;
