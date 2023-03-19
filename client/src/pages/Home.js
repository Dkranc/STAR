import { React, useState } from "react";
import "./Home.css";
import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const pageName = "ראשי - מדריך"; //presented page name
const Home = ({ user, setUser, lightState }) => {
  const [roles, setRoles] = useState([
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
    { name: "הזנת הערכת משהד", id: 5 },
  ]);

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
      <NavBar pageName={pageName} />
      <Box
        sx={{
          padding: "32px",
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
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    mt: 3,
                    mb: 2,
                    borderRadius: 30,
                    fontFamily: "Bold",
                  }}
                  color={lightState ? "success" : "info"}
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
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  mt: 3,
                  mb: 2,
                  borderRadius: 30,
                  fontFamily: "Bold",
                }}
                color={lightState ? "success" : "info"}
                onClick={() => navigate(`/SelectSoldiers/${role.id}`)}
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
